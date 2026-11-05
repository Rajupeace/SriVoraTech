/**
 * Distributed Rate Limiting Helper for SriVoraTech Serverless & Express APIs
 * 
 * Supports:
 * 1. Redis / Upstash (via REDIS_URL, KV_URL, or UPSTASH_REDIS_URL) for distributed serverless instances.
 * 2. In-memory fallback if Redis is not configured or temporarily unreachable.
 * 3. Salted one-way hashing for IP privacy (GDPR / DPDP compliance).
 */

import crypto from 'crypto'
import Redis from 'ioredis'

const WINDOW_SECONDS = 600 // 10 minutes
const MAX_REQUESTS = 5

let redisClient = null
let redisAvailable = false
let redisInitAttempted = false

function getRedisClient() {
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
      connectTimeout: 2000,
      maxRetriesPerRequest: 1,
      lazyConnect: true,
      enableOfflineQueue: false,
    })

    redisClient.on('error', (err) => {
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

// In-memory fallback store
const memoryStore = new Map()

// Clean expired memory records periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of memoryStore.entries()) {
    if (now > record.resetTime) {
      memoryStore.delete(key)
    }
  }
}, 60000).unref?.()

/**
 * Anonymize client IP using a salted SHA-256 hash.
 * Stores only a non-reversible token for rate limiting and abuse prevention.
 */
export function hashClientIp(clientIp) {
  const salt = process.env.IP_HASH_SALT || 'svt_privacy_salt_2026'
  const rawIp = String(clientIp || 'unknown').trim()
  return crypto.createHash('sha256').update(`${rawIp}:${salt}`).digest('hex').substring(0, 24)
}

/**
 * Check distributed rate limit
 * @param {string} clientIp - Client IP address
 * @param {object} options - { maxRequests, windowSeconds }
 * @returns {Promise<{ allowed: boolean, current: number, limit: number, ttl: number }>}
 */
export async function checkRateLimit(clientIp, options = {}) {
  const limit = options.maxRequests || MAX_REQUESTS
  const windowSec = options.windowSeconds || WINDOW_SECONDS
  const ipToken = hashClientIp(clientIp)
  const key = `rl:contact:${ipToken}`

  const client = getRedisClient()

  // Attempt A: Distributed Redis Rate Limiting
  if (client && redisAvailable) {
    try {
      // Atomic increment and expiry using Redis pipeline
      const pipeline = client.pipeline()
      pipeline.incr(key)
      pipeline.ttl(key)
      const results = await pipeline.exec()

      if (results && results[0] && !results[0][0]) {
        const count = results[0][1]
        let ttl = results[1] ? results[1][1] : -1

        // If key was just created (TTL == -1), set its expiration window
        if (ttl === -1 || count === 1) {
          await client.expire(key, windowSec)
          ttl = windowSec
        }

        return {
          allowed: count <= limit,
          current: count,
          limit,
          ttl: Math.max(ttl, 0),
        }
      }
    } catch (redisErr) {
      // Graceful fallback to memory on Redis communication glitch
    }
  }

  // Attempt B: Local In-Memory Fallback
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
  }
}
