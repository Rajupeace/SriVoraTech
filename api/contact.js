import os from 'os'
import fs from 'fs'
import path from 'path'
import { connectToDatabase } from './mongodb.js'

// In-memory rate limiting: max 5 submissions per 10 minutes per IP
const contactRateLimitMap = new Map()
function checkRateLimit(ip) {
  if (!ip) return false
  const now = Date.now()
  const windowMs = 10 * 60 * 1000 // 10 minutes
  const maxSubmissions = 5

  const record = contactRateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs }
  if (now > record.resetTime) {
    record.count = 1
    record.resetTime = now + windowMs
    contactRateLimitMap.set(ip, record)
    return false
  }
  record.count++
  contactRateLimitMap.set(ip, record)
  return record.count > maxSubmissions
}

// Google Apps Script webhook forwarder for sheet sync
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzzB8S5E3JqKFYuj-2RX7oHWXkv0taRPv0aQBAjIr2TQkVp0K0grPCIcZWVrbbXQlSo/exec'

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

  const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown'

  // 1. Rate Limiting
  if (checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Submission limit reached. Please wait a few minutes before submitting another enquiry.'
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

    // 2. Spam Honeypot Protection
    if (body.botCheck || body._gotcha || body.website_url) {
      // Silently reject automated bot submissions
      return res.status(200).json({ success: true, message: 'Enquiry received.' })
    }

    const name = (body.name || body.fullName || '').trim()
    const email = (body.email || '').trim().toLowerCase()
    const phone = (body.phone || '').trim()
    const company = (body.company || '').trim()
    const budget = (body.budget || '').trim()
    const message = (body.message || body.whySriVoraTech || '').trim()

    // 3. Validation
    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name is required and must be at least 2 characters.'
      })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.'
      })
    }

    if (phone && !/^[+\d\s()-]{7,20}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number (digits, optional +, spaces, hyphens).'
      })
    }

    if (!message || message.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Project description or enquiry message must be at least 10 characters.'
      })
    }

    if (message.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Message exceeds the maximum allowed length of 5,000 characters.'
      })
    }

    const enquiryId = `svt_enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`

    const enquiry = {
      enquiryId,
      type: 'Contact',
      name,
      email,
      phone: phone || null,
      company: company || null,
      budget: budget || null,
      message,
      submittedAt: new Date().toISOString(),
      ip: clientIp
    }

    // 4. Durable Storage Strategy
    let persisted = false

    // Attempt A: MongoDB Atlas
    try {
      const { db } = await connectToDatabase()
      if (db) {
        await db.collection('contact_enquiries').insertOne(enquiry)
        persisted = true
      }
    } catch (dbErr) {
      console.warn('MongoDB Atlas write failed:', dbErr.message)
    }

    // Attempt B: Local/Serverless File Storage Backup
    try {
      const storageDir = fs.existsSync(path.join(process.cwd(), 'uploads'))
        ? path.join(process.cwd(), 'uploads')
        : os.tmpdir()
      
      const filePath = path.join(storageDir, 'contact_enquiries.json')
      let list = []
      if (fs.existsSync(filePath)) {
        try {
          list = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        } catch (e) {
          list = []
        }
      }
      list.push(enquiry)
      fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf8')
      persisted = true
    } catch (fsErr) {
      console.warn('Filesystem fallback write failed:', fsErr.message)
    }

    // If both persistent stores failed, fail safely
    if (!persisted) {
      return res.status(500).json({
        success: false,
        message: 'Unable to durably save your enquiry at this moment. Please contact us directly at contact@srivoratech.in'
      })
    }

    // Attempt C: Asynchronous Google Sheets backup (non-blocking)
    if (GOOGLE_SCRIPT_URL) {
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          ...enquiry,
          type: 'Contact',
          whySriVoraTech: message,
          fullName: name
        })
      }).catch(err => {
        // Non-fatal logging for secondary sync
        console.warn('Secondary Google Sheets sync skipped:', err.message)
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry received successfully! Our team will contact you within 24 hours.',
      enquiryId
    })
  } catch (error) {
    console.error('Contact API Error:', error.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error processing enquiry. Please email contact@srivoratech.in directly.'
    })
  }
}
