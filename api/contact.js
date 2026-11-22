/**
 * Production Contact API Endpoint for SriVoraTech
 * 
 * Strict Gate Compliance:
 * 1. MongoDB Atlas is the sole authoritative primary store with majority write concern.
 * 2. Read-after-write verification confirms persistence before HTTP 200.
 * 3. Distributed Redis rate limiting (max 5 submissions per 10 minutes per IP).
 * 4. Production strictly blocks execution if Redis rate limiting is unavailable (no silent memory fallback).
 * 5. Strict email validation: non-strings return 400; internal spaces return 400; surrounding whitespace trimmed.
 * 6. IP pseudonymized via salted cryptographic token (production requires minimum 32-char secret).
 * 7. Public logs never expose personal customer contact information.
 */

import { connectToDatabase, verifyDatabaseWrite } from './mongodb.js'
import { checkRateLimit, hashClientIp } from './ratelimit.js'

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzzB8S5E3JqKFYuj-2RX7oHWXkv0taRPv0aQBAjIr2TQkVp0K0grPCIcZWVrbbXQlSo/exec'

/**
 * Strict email validator
 * Handles type safety, length bounds, whitespace rules, and RFC 5322 syntax.
 */
export function validateEmail(email) {
  if (email === undefined || email === null) {
    return { valid: false, error: 'Email address is required.' }
  }

  if (typeof email !== 'string') {
    return { valid: false, error: 'Email must be a valid text string.' }
  }

  // Sanitize surrounding whitespace (copy-paste convenience)
  const trimmed = email.trim()

  if (trimmed.length === 0) {
    return { valid: false, error: 'Email address cannot be empty.' }
  }

  // Reject internal whitespace
  if (/\s/.test(trimmed)) {
    return { valid: false, error: 'Email address must not contain internal spaces or whitespace.' }
  }

  if (trimmed.length > 254) {
    return { valid: false, error: 'Email address must not exceed 254 characters.' }
  }

  const parts = trimmed.split('@')
  if (parts.length !== 2) {
    return { valid: false, error: 'Email must contain exactly one "@" symbol.' }
  }

  const [local, domain] = parts
  if (!local || local.length > 64) {
    return { valid: false, error: 'Email local part must be between 1 and 64 characters.' }
  }
  if (!domain || domain.length > 253) {
    return { valid: false, error: 'Email domain part must be between 1 and 253 characters.' }
  }

  if (local.includes('..') || domain.includes('..')) {
    return { valid: false, error: 'Email must not contain consecutive dots.' }
  }

  if (local.startsWith('.') || local.endsWith('.')) {
    return { valid: false, error: 'Email local part must not start or end with a dot.' }
  }

  const strictEmailRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
  if (!strictEmailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid official email address.' }
  }

  return { valid: true, normalized: trimmed.toLowerCase() }
}

export default async function handler(req, res) {
  // CORS & Security Headers
  const origin = req.headers.origin || ''
  const allowedOrigins = [
    'https://www.srivoratech.in',
    'https://srivoratech.in',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:3001'
  ]
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.srivoratech.in')
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'

  // 1. Distributed Rate Limiting
  const rateLimit = await checkRateLimit(clientIp, { maxRequests: 5, windowSeconds: 600 })

  if (rateLimit.serviceUnavailable) {
    console.error('[Rate Limit Error]:', rateLimit.error)
    return res.status(503).json({
      success: false,
      message: 'Rate limiting service is temporarily unavailable. Please email contact@srivoratech.in directly.'
    })
  }

  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', rateLimit.ttl || 600)
    return res.status(429).json({
      success: false,
      message: 'Submission limit reached. Please wait a few minutes before submitting another enquiry.',
      retryAfter: rateLimit.ttl || 600
    })
  }

  try {
    let body = req.body || {}
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body)
      } catch (e) {
        return res.status(400).json({ success: false, message: 'Malformed JSON payload.' })
      }
    }

    // 2. Type-Safety Check: Reject non-string payloads with HTTP 400 (NOT 500)
    if (body.email !== undefined && body.email !== null && typeof body.email !== 'string') {
      return res.status(400).json({ success: false, message: 'Email must be a valid text string.' })
    }
    if (body.name !== undefined && body.name !== null && typeof body.name !== 'string') {
      return res.status(400).json({ success: false, message: 'Name must be a valid text string.' })
    }
    if (body.fullName !== undefined && body.fullName !== null && typeof body.fullName !== 'string') {
      return res.status(400).json({ success: false, message: 'Full name must be a valid text string.' })
    }
    if (body.message !== undefined && body.message !== null && typeof body.message !== 'string') {
      return res.status(400).json({ success: false, message: 'Message must be a valid text string.' })
    }
    if (body.phone !== undefined && body.phone !== null && typeof body.phone !== 'string') {
      return res.status(400).json({ success: false, message: 'Phone must be a valid text string.' })
    }
    if (body.company !== undefined && body.company !== null && typeof body.company !== 'string') {
      return res.status(400).json({ success: false, message: 'Company must be a valid text string.' })
    }

    // 3. Spam Honeypot Protection (Silent rejection for bots)
    if (body.botCheck || body._gotcha || body.website_url) {
      return res.status(200).json({ success: true, message: 'Enquiry received.' })
    }

    const rawName = String(body.name || body.fullName || '').trim()
    const rawEmail = body.email
    const rawPhone = String(body.phone || '').trim()
    const rawCompany = String(body.company || '').trim()
    const rawBudget = String(body.budget || '').trim()
    const rawMessage = String(body.message || body.whySriVoraTech || '').trim()
    const isTest = Boolean(body.isTest)

    // 4. Field Validations & Length Bounds
    if (!rawName || rawName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name is required and must be at least 2 characters.'
      })
    }
    if (rawName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name must not exceed 100 characters.'
      })
    }

    // Strict Email Validation
    const emailResult = validateEmail(rawEmail)
    if (!emailResult.valid) {
      return res.status(400).json({
        success: false,
        message: emailResult.error
      })
    }
    const normalizedEmail = emailResult.normalized

    if (rawCompany.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Company name must not exceed 100 characters.'
      })
    }

    if (rawPhone) {
      if (rawPhone.length > 30) {
        return res.status(400).json({
          success: false,
          message: 'Phone number must not exceed 30 characters.'
        })
      }
      const phoneRegex = /^[+\d\s().-]{7,30}$/
      if (!phoneRegex.test(rawPhone)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid contact phone number.'
        })
      }
    }

    if (rawBudget.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Budget selection must not exceed 50 characters.'
      })
    }

    if (!rawMessage || rawMessage.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message is required and must be at least 10 characters.'
      })
    }
    if (rawMessage.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Message must not exceed 5000 characters.'
      })
    }

    // 5. Generate Unique Enquiry ID & Pseudonymized IP Token
    const enquiryId = `svt_enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    const now = new Date()
    const retentionExpiry = new Date(now.getTime() + (180 * 24 * 60 * 60 * 1000)) // 180-day retention

    const enquiry = {
      enquiryId,
      type: 'Contact',
      name: rawName,
      email: normalizedEmail,
      phone: rawPhone || null,
      company: rawCompany || null,
      budget: rawBudget || null,
      message: rawMessage,
      submittedAt: now.toISOString(),
      createdAt: now,
      expiresAt: retentionExpiry,
      ipToken: hashClientIp(clientIp),
      isTest: isTest || undefined
    }

    // 6. Authoritative MongoDB Atlas Storage (Majority Write Concern)
    const { db, error: dbError } = await connectToDatabase()

    if (!db) {
      console.error('[Contact API] MongoDB connection unavailable:', dbError)
      return res.status(503).json({
        success: false,
        message: 'Our primary database service is temporarily unavailable. Please email contact@srivoratech.in directly.'
      })
    }

    // Majority acknowledgement write concern
    await db.collection('contact_enquiries').insertOne(enquiry, {
      writeConcern: { w: 'majority', wtimeoutMS: 5000 }
    })

    // Read-after-write verification
    const isCommitted = await verifyDatabaseWrite(db, 'contact_enquiries', { enquiryId })
    if (!isCommitted) {
      console.error('[Contact API] Read-after-write verification failed for:', enquiryId)
      return res.status(500).json({
        success: false,
        message: 'Failed to confirm enquiry persistence in database. Please contact us directly.'
      })
    }

    console.log(`[Contact API] Enquiry durably persisted: ${enquiryId} (domain: ${normalizedEmail.split('@')[1]})`)

    // 7. Optional Non-Blocking Secondary Integration (Google Sheets)
    if (!isTest && GOOGLE_SCRIPT_URL) {
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          timestamp: enquiry.submittedAt,
          fullName: rawName,
          email: normalizedEmail,
          phone: rawPhone || '',
          company: rawCompany || '',
          budget: rawBudget || '',
          message: rawMessage,
          enquiryId
        })
      }).catch(err => {
        console.warn('[Contact API] Secondary Google Sheets sync skipped:', err.message)
      })
    }

    // 8. Successful Durable Receipt
    return res.status(200).json({
      success: true,
      message: 'Enquiry received successfully! Our team will contact you within 24 hours.',
      enquiryId
    })

  } catch (error) {
    console.error('[Contact API] Internal processing error:', error.message)
    return res.status(500).json({
      success: false,
      message: 'An internal error occurred while processing your request. Please email contact@srivoratech.in.'
    })
  }
}
