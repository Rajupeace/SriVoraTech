import fs from 'fs'
import path from 'path'
import { connectToDatabase } from './mongodb.js'

const ADMIN_TOKEN = process.env.ADMIN_SECRET_KEY || 'srivoratech_admin_secure_session_token_2026'
const ADMIN_USER = process.env.ADMIN_USER || 'admin'
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'srivoratech2026'

// Empty initial reviews — no fake or founder self-reviews in customer feedback
const DEFAULT_REVIEWS = []

// Simple in-memory IP rate limiter for review submissions
const rateLimitMap = new Map()
function isRateLimited(ip) {
  if (!ip) return false
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxReqs = 5

  const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs }
  if (now > record.resetTime) {
    record.count = 1
    record.resetTime = now + windowMs
    rateLimitMap.set(ip, record)
    return false
  }
  record.count++
  rateLimitMap.set(ip, record)
  return record.count > maxReqs
}

function getWritableStoragePath() {
  const tmpPath = path.join('/tmp', 'reviews.json')
  const uploadsDir = path.join(process.cwd(), 'uploads')
  const uploadsPath = path.join(uploadsDir, 'reviews.json')

  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }
    const testFile = path.join(uploadsDir, '.write_test')
    fs.writeFileSync(testFile, 'test')
    fs.unlinkSync(testFile)
    return uploadsPath
  } catch (e) {
    return tmpPath
  }
}

function getLocalReviews() {
  const targetPath = getWritableStoragePath()
  try {
    if (fs.existsSync(targetPath)) {
      const data = fs.readFileSync(targetPath, 'utf8')
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed)) {
        global._svt_in_memory_reviews = parsed
        return parsed
      }
    }
  } catch (err) {}

  if (!global._svt_in_memory_reviews) {
    global._svt_in_memory_reviews = [...DEFAULT_REVIEWS]
  }
  return global._svt_in_memory_reviews
}

function saveLocalReviews(reviews) {
  global._svt_in_memory_reviews = reviews
  try {
    const targetPath = getWritableStoragePath()
    const dir = path.dirname(targetPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(targetPath, JSON.stringify(reviews, null, 2))
  } catch (err) {}
}

async function getReviewsFromDb() {
  const localList = getLocalReviews()
  try {
    const { db } = await connectToDatabase()
    if (db) {
      const dbReviews = await db.collection('reviews').find({}).toArray()
      if (Array.isArray(dbReviews) && dbReviews.length > 0) {
        return dbReviews
      }
    }
  } catch (e) {
    console.warn('MongoDB read failed, using local store:', e.message)
  }
  return localList
}

async function saveReviewToDb(review) {
  try {
    const { db } = await connectToDatabase()
    if (db) {
      await db.collection('reviews').updateOne(
        { id: review.id },
        { $set: review },
        { upsert: true }
      )
    }
  } catch (e) {
    console.warn('MongoDB write failed:', e.message)
  }
}

async function deleteReviewFromDb(id) {
  try {
    const { db } = await connectToDatabase()
    if (db) {
      await db.collection('reviews').deleteOne({
        $or: [{ id: String(id) }, { id: parseInt(id, 10) }]
      })
    }
  } catch (e) {
    console.warn('MongoDB delete failed:', e.message)
  }
}

function checkAdminAuth(req) {
  const token = req.headers['x-admin-token'] || req.headers['authorization']?.replace('Bearer ', '')
  return Boolean(token && token === ADMIN_TOKEN)
}

export default async function handler(req, res) {
  // CORS & Security Headers
  const origin = req.headers.origin || ''
  const allowedOrigins = ['https://www.srivoratech.in', 'https://srivoratech.in', 'http://localhost:3000', 'http://localhost:5173', 'http://localhost:3001']
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.srivoratech.in')
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type, x-admin-token, Authorization'
  )
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const url = req.url || ''
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown'

  // ── 1. Admin Login Endpoint ──
  const isLoginReq = url.includes('action=login') || url.includes('/login')
  if (isLoginReq && req.method === 'POST') {
    let body = req.body || {}
    if (typeof body === 'string') {
      try { body = JSON.parse(body) } catch (e) { body = {} }
    }

    const { username, password } = body
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      return res.status(200).json({ success: true, token: ADMIN_TOKEN })
    }
    return res.status(401).json({ success: false, message: 'Invalid administrator credentials.' })
  }

  // ── 2. Admin Operations (Strict Authorization Required) ──
  const isAdminList = url.includes('action=admin_list')
  const isApprove = url.includes('action=approve')
  const isReject = url.includes('action=reject')
  const isEdit = url.includes('action=edit')
  const isDelete = url.includes('action=delete')

  if (isAdminList || isApprove || isReject || isEdit || isDelete) {
    if (!checkAdminAuth(req)) {
      return res.status(403).json({ success: false, message: 'Forbidden: Valid administrator authentication required.' })
    }

    const reviews = await getReviewsFromDb()
    const urlObj = new URL(url, 'http://localhost')
    const id = urlObj.searchParams.get('id')

    if (isAdminList && req.method === 'GET') {
      return res.status(200).json({ success: true, reviews })
    }

    if (isApprove) {
      const match = reviews.find(r => String(r.id) === String(id))
      if (!match) return res.status(404).json({ success: false, message: 'Review not found.' })
      match.status = 'Approved'
      saveLocalReviews(reviews)
      await saveReviewToDb(match)
      return res.status(200).json({ success: true, review: match })
    }

    if (isReject) {
      const match = reviews.find(r => String(r.id) === String(id))
      if (!match) return res.status(404).json({ success: false, message: 'Review not found.' })
      match.status = 'Rejected'
      saveLocalReviews(reviews)
      await saveReviewToDb(match)
      return res.status(200).json({ success: true, review: match })
    }

    if (isDelete) {
      const filtered = reviews.filter(r => String(r.id) !== String(id))
      saveLocalReviews(filtered)
      await deleteReviewFromDb(id)
      return res.status(200).json({ success: true, message: 'Review deleted.' })
    }
  }

  // ── 3. Public GET /api/reviews ──
  // Returns ONLY administrator-approved customer reviews. No self-reviews.
  if (req.method === 'GET') {
    const allReviews = await getReviewsFromDb()
    const approved = allReviews.filter(r => {
      if (!r) return false
      const s = String(r.status || '').toLowerCase()
      const isInternal = Boolean(r.isFounder) || 
        (r.name && (r.name.toLowerCase().includes('founder') || r.name.toLowerCase().includes('ceo') || r.name.toLowerCase().includes('cto')))
      return s === 'approved' && !isInternal
    })

    approved.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    const totalApproved = approved.length

    let averageRating = null
    let satisfactionRate = null
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

    if (totalApproved > 0) {
      const sum = approved.reduce((acc, curr) => acc + (parseInt(curr.star, 10) || 0), 0)
      averageRating = parseFloat((sum / totalApproved).toFixed(1))

      approved.forEach(r => {
        const s = parseInt(r.star, 10)
        if (s >= 1 && s <= 5 && counts[s] !== undefined) {
          counts[s]++
        }
      })

      Object.keys(counts).forEach(s => {
        distribution[s] = Math.round((counts[s] / totalApproved) * 100)
      })

      const highRatings = counts[5] + counts[4]
      satisfactionRate = Math.round((highRatings / totalApproved) * 100)
    }

    return res.status(200).json({
      success: true,
      reviews: approved,
      totalCount: totalApproved,
      averageRating,
      distribution,
      counts,
      satisfactionRate
    })
  }

  // ── 4. Public POST /api/reviews (New Customer Review Submission) ──
  if (req.method === 'POST') {
    if (isRateLimited(clientIp)) {
      return res.status(429).json({ success: false, message: 'Too many submissions. Please try again later.' })
    }

    let body = req.body || {}
    if (typeof body === 'string') {
      try { body = JSON.parse(body) } catch (e) { body = {} }
    }

    const name = (body.name || '').trim()
    const email = (body.email || '').trim().toLowerCase()
    const star = parseInt(body.star, 10)
    const comment = (body.comment || '').trim()
    const company = (body.company || '').trim()

    if (!name || !email || !star || !comment) {
      return res.status(400).json({ success: false, message: 'Name, valid email, star rating, and review comment are required.' })
    }

    if (star < 1 || star > 5) {
      return res.status(400).json({ success: false, message: 'Star rating must be between 1 and 5.' })
    }

    if (comment.length < 10) {
      return res.status(400).json({ success: false, message: 'Review comment must be at least 10 characters.' })
    }

    const newReview = {
      id: Date.now(),
      name,
      email,
      company,
      star,
      comment,
      status: 'Pending', // Enforce Pending status — never auto-approved
      isFounder: false,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now(),
      ip: clientIp
    }

    const reviews = await getReviewsFromDb()
    reviews.push(newReview)
    saveLocalReviews(reviews)
    await saveReviewToDb(newReview)

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your review has been submitted for moderation and will appear after verification.'
    })
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' })
}
