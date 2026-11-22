/**
 * Production Distributed Rate Limiting Helper for SriVoraTech
 * 
 * Strict Gate Requirements:
 * 1. Production strictly requires a functional Redis provider (REDIS_URL / KV_URL / UPSTASH_REDIS_URL).
 * 2. In-memory fallback is disabled in production (preventing local memory drift across serverless nodes).
 * 3. Memory fallback is permitted ONLY in development/testing.
 * 4. IP_HASH_SALT must be a strong production secret (minimum 32 characters); default hardcoding is banned in production.
 * 5. Returns safe error (serviceUnavailable) when rate limiting is unreachable in production.
 */

import crypto from 'crypto'
import Redis from 'ioredis'

const WINDOW_SECONDS = 600 // 10 minutes
const MAX_REQUESTS = 5

let redisClient = null
let redisAvailable = false
let redisInitAttempted = false

// Ephemeral development/testing salt generated once per process lifecycle
const devSessionSalt = crypto.randomBytes(32).toString('hex')

/**
 * Validate and retrieve IP pseudonymization salt
 * @param {boolean} isProd 
 * @returns {string}
 */
export function getIpHashSalt(isProd = false) {
  const salt = process.env.IP_HASH_SALT

  if (isProd) {
    if (!salt || salt.length < 32 || salt.includes('default') || salt.includes('2026') || salt.includes('svt_privacy_salt')) {
      throw new Error('SECURITY_ERROR: IP_HASH_SALT must be a strong production secret of at least 32 characters in production.')
    }
    return salt
  }

  // Non-production fallback (session-isolated random salt)
  return salt && salt.length >= 16 ? salt : devSessionSalt
}

/**
 * Anonymize client IP using a salted SHA-256 hash.
 * Produces a one-way pseudonymized token for rate limiting and abuse prevention.
 */
export function hashClientIp(clientIp, options = {}) {
  const isProd = options.isProduction ?? (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production')
  const salt = getIpHashSalt(isProd)
  const rawIp = String(clientIp || 'unknown').trim()
  return crypto.createHash('sha256').update(`${rawIp}:${salt}`).digest('hex').substring(0, 24)
}

/**
 * Initialize or retrieve Redis client
 * @param {string} [customUrl] - Optional custom Redis URL for testing
 * @returns {Redis | null}
 */
export function getRedisClient(customUrl = null) {
  if (customUrl) {
    const client = new Redis(customUrl, {
      connectTimeout: 2000,
      maxRetriesPerRequest: 1,
      lazyConnect: true,
      enableOfflineQueue: false,
      enableReadyCheck: false,
      retryStrategy: () => null,
    })
    client.on('error', () => {})
    return client
  }

  if (redisInitAttempted) {
    return redisAvailable ? redisClient : null
  }

  redisInitAttempted = true
  const redisUrl = process.env.REDIS_URL || process.env.KV_URL || process.env.UPSTASH_REDIS_URL

  if (!redisUrl) {
    return null
  }

  try {
    redisClient = new Redis(redisUrl, {
      connectTimeout: 2500,
      maxRetriesPerRequest: 1,
      lazyConnect: true,
      enableOfflineQueue: false,
      enableReadyCheck: false,
      retryStrategy: (times) => (times > 2 ? null : Math.min(times * 100, 500)),
    })

    redisClient.on('error', () => {
      redisAvailable = false
    })

    redisClient.on('connect', () => {
      redisAvailable = true
    })

    redisClient.connect().then(() => {
      redisAvailable = true
    }).catch(() => {
      redisAvailable = false
    })

    return redisClient
  } catch (err) {
    redisAvailable = false
    return null
  }
}

// In-memory store exclusively for local development & testing
const memoryStore = new Map()

// Cleanup expired memory records in development
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of memoryStore.entries()) {
    if (now > record.resetTime) {
      memoryStore.delete(key)
    }
  }
}, 60000).unref?.()

/**
 * Check distributed rate limit
 * @param {string} clientIp - Client IP
 * @param {object} options - Configuration options
 * @returns {Promise<{ allowed: boolean, current?: number, limit?: number, ttl?: number, provider: string, serviceUnavailable?: boolean, error?: string }>}
 */
export async function checkRateLimit(clientIp, options = {}) {
  const isProd = options.isProduction ?? (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production')
  const limit = options.maxRequests || MAX_REQUESTS
  const windowSec = options.windowSeconds || WINDOW_SECONDS

  let ipToken
  try {
    ipToken = hashClientIp(clientIp, { isProduction: isProd })
  } catch (err) {
    if (isProd) {
      return {
        allowed: false,
        serviceUnavailable: true,
        provider: 'none',
        error: err.message
      }
    }
    ipToken = hashClientIp(clientIp, { isProduction: false })
  }

  const key = `rl:contact:${ipToken}`
  const client = options.customRedisClient || getRedisClient(options.customRedisUrl)

  // 1. Attempt Distributed Redis Rate Limiting
  if (client) {
    try {
      if (client.status === 'wait') {
        await Promise.race([
          client.connect(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Redis connection timeout')), 2000))
        ]).catch(() => {})
      }
      if (client.status !== 'ready' && client.status !== 'connect') {
        throw new Error(`Redis client not ready (status: ${client.status})`)
      }
      const pipeline = client.pipeline()
      pipeline.incr(key)
      pipeline.ttl(key)
      const results = await pipeline.exec()
      if (!results || !results[0] || results[0][0]) {
        console.error('[Redis Pipeline Error]:', results?.[0]?.[0] || 'No pipeline results')
        if (isProd) {
          return {
            allowed: false,
            serviceUnavailable: true,
            provider: 'redis',
            error: results?.[0]?.[0]?.message || 'Redis pipeline execution failed.'
          }
        }
      } else {
        const count = results[0][1]
        let ttl = results[1] ? results[1][1] : -1

        if (ttl === -1 || count === 1) {
          await client.expire(key, windowSec)
          ttl = windowSec
        }

        return {
          allowed: count <= limit,
          current: count,
          limit,
          ttl: Math.max(ttl, 0),
          provider: 'redis',
        }
      }
    } catch (redisErr) {
      // In production, do NOT fall back to memory!
      if (isProd) {
        return {
          allowed: false,
          serviceUnavailable: true,
          provider: 'redis',
          error: 'Production Redis rate limiter communication failed.'
        }
      }
    }
  }

  // 2. Production Gate: If Redis is missing or disconnected in production, fail safely
  if (isProd) {
    return {
      allowed: false,
      serviceUnavailable: true,
      provider: 'none',
      error: 'REDIS_URL must be configured and reachable in production.'
    }
  }

  // 3. Local Development / Non-Production In-Memory Fallback
  const now = Date.now()
  const record = memoryStore.get(key) || { count: 0, resetTime: now + (windowSec * 1000) }

  if (now > record.resetTime) {
    record.count = 1
    record.resetTime = now + (windowSec * 1000)
    memoryStore.set(key, record)
    return {
      allowed: true,
      current: 1,
      limit,
      ttl: windowSec,
      provider: 'memory',
    }
  }

  record.count++
  memoryStore.set(key, record)
  const ttl = Math.max(Math.ceil((record.resetTime - now) / 1000), 0)

  return {
    allowed: record.count <= limit,
    current: record.count,
    limit,
    ttl,
    provider: 'memory',
  }
}
