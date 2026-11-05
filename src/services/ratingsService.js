/**
 * Real-time Ratings & Review Service
 * SriVoraTech Genuine Client Feedback Engine
 * 
 * Rules:
 * 1. Founder/Executive statements are NOT customer reviews (kept strictly in Leadership/About).
 * 2. No fabricated fallbacks (no 5.0 defaults when empty).
 * 3. No artificial visitor counts.
 * 4. Strictly require admin approval for public display.
 * 5. No plaintext credentials in client code.
 */

// Client helper to get the saved admin token
export function getAdminToken() {
  return localStorage.getItem('svt_admin_token') || ''
}

export function saveAdminToken(token) {
  if (token) {
    localStorage.setItem('svt_admin_token', token)
  }
}

export function removeAdminToken() {
  localStorage.removeItem('svt_admin_token')
}

// Calculate metrics strictly from approved customer reviews (excluding internal team)
function calculateMetrics(reviewsList = []) {
  const approved = reviewsList.filter(r => {
    if (!r) return false
    const s = String(r.status || '').trim().toLowerCase()
    const isInternal = Boolean(r.isFounder) || 
      (r.name && (r.name.toLowerCase().includes('founder') || r.name.toLowerCase().includes('ceo') || r.name.toLowerCase().includes('cto')))
    return s === 'approved' && !isInternal
  })

  approved.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))

  const totalCount = approved.length
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  
  approved.forEach(r => {
    const s = parseInt(r.star, 10)
    if (s >= 1 && s <= 5 && counts[s] !== undefined) {
      counts[s]++
    }
  })

  let averageRating = null
  let satisfactionRate = null
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

  if (totalCount > 0) {
    const sum = approved.reduce((acc, curr) => acc + (parseInt(curr.star, 10) || 0), 0)
    averageRating = parseFloat((sum / totalCount).toFixed(1))
    
    Object.keys(counts).forEach(star => {
      distribution[star] = Math.round((counts[star] / totalCount) * 100)
    })

    const highRatings = counts[5] + counts[4]
    satisfactionRate = Math.round((highRatings / totalCount) * 100)
  }

  return {
    ratings: approved.map(r => parseInt(r.star, 10)),
    reviews: approved,
    totalCount,
    averageRating,
    distribution,
    counts,
    satisfactionRate
  }
}

// Memory store for loaded reviews in the current session
let sessionReviews = []
let subscribers = []

function notifySubscribers() {
  const metrics = calculateMetrics(sessionReviews)
  subscribers.forEach(cb => {
    try { cb(metrics) } catch (e) { console.error('Rating subscriber error:', e) }
  })
}

/**
 * Fetch verified reviews from backend API
 */
export async function fetchLiveReviews() {
  try {
    const res = await fetch('/api/reviews', {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    })
    if (res.ok) {
      const data = await res.json()
      if (data && Array.isArray(data.reviews)) {
        sessionReviews = data.reviews
        notifySubscribers()
        return calculateMetrics(sessionReviews)
      }
    }
  } catch (err) {
    // Non-fatal network fallback
  }
  return calculateMetrics(sessionReviews)
}

/**
 * Subscribe to rating metrics updates
 */
export function subscribeToRatings(callback) {
  subscribers.push(callback)
  // Immediate invocation with current metrics
  callback(calculateMetrics(sessionReviews))
  // Trigger initial fetch
  fetchLiveReviews()

  // Periodic refresh (every 30s, not 2.5s spam)
  const interval = setInterval(fetchLiveReviews, 30000)

  return () => {
    subscribers = subscribers.filter(cb => cb !== callback)
    clearInterval(interval)
  }
}

/**
 * Submit a customer rating
 * Submissions enter the moderation queue as 'Pending'
 */
export async function submitRating(reviewData) {
  const { name, email, star, comment, company, profileImage } = reviewData

  if (!name || !email || !star || !comment) {
    throw new Error('Name, email, star rating, and review comment are required.')
  }

  const payload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    company: (company || '').trim(),
    star: parseInt(star, 10),
    comment: comment.trim(),
    profileImage: profileImage || '',
    status: 'Pending', // Strictly pending until admin review
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    timestamp: Date.now()
  }

  // 1. Submit to server API
  const res = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(errorBody.message || `Server error (${res.status}) while submitting review.`)
  }

  const result = await res.json()
  return {
    success: true,
    message: 'Thank you! Your review has been submitted for moderation and will appear after verification.'
  }
}

/**
 * Secure Admin Login
 * Authenticates against the backend API — no plaintext credentials in client code.
 */
export async function adminLogin(username, password) {
  const u = (username || '').trim()
  const p = (password || '').trim()

  if (!u || !p) {
    throw new Error('Username and password are required.')
  }

  const response = await fetch('/api/reviews?action=login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: u, password: p })
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.message || 'Authentication failed. Please verify your administrator credentials.')
  }

  const result = await response.json()
  if (result.token) {
    saveAdminToken(result.token)
    return { success: true, token: result.token }
  }

  throw new Error('Authentication failed: no session token returned.')
}

/**
 * Admin: Get all reviews (including Pending and Rejected)
 */
export async function adminGetReviews({ search = '', rating = '', status = '' } = {}) {
  const token = getAdminToken()
  const params = new URLSearchParams()
  if (search) params.append('search', search)
  if (rating) params.append('rating', rating)
  if (status) params.append('status', status)

  const res = await fetch(`/api/reviews?action=admin_list&${params.toString()}`, {
    headers: {
      'x-admin-token': token,
      'Accept': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error(`Admin fetch failed: HTTP ${res.status}`)
  }

  const data = await res.json()
  return data.reviews || []
}

/**
 * Admin: Approve a review
 */
export async function adminApproveReview(id) {
  const token = getAdminToken()
  const res = await fetch(`/api/reviews?action=approve&id=${id}`, {
    method: 'PATCH',
    headers: {
      'x-admin-token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: 'Approved' })
  })

  if (!res.ok) {
    throw new Error('Failed to approve review.')
  }
  await fetchLiveReviews()
  return res.json()
}

/**
 * Admin: Reject a review
 */
export async function adminRejectReview(id) {
  const token = getAdminToken()
  const res = await fetch(`/api/reviews?action=reject&id=${id}`, {
    method: 'PATCH',
    headers: {
      'x-admin-token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: 'Rejected' })
  })

  if (!res.ok) {
    throw new Error('Failed to reject review.')
  }
  await fetchLiveReviews()
  return res.json()
}

/**
 * Admin: Edit a review
 */
export async function adminEditReview(id, updates) {
  const token = getAdminToken()
  const res = await fetch(`/api/reviews?action=edit&id=${id}`, {
    method: 'PUT',
    headers: {
      'x-admin-token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  })

  if (!res.ok) {
    throw new Error('Failed to update review.')
  }
  await fetchLiveReviews()
  return res.json()
}

/**
 * Admin: Delete a review
 */
export async function adminDeleteReview(id) {
  const token = getAdminToken()
  const res = await fetch(`/api/reviews?action=delete&id=${id}`, {
    method: 'DELETE',
    headers: {
      'x-admin-token': token
    }
  })

  if (!res.ok) {
    throw new Error('Failed to delete review.')
  }
  await fetchLiveReviews()
  return res.json()
}

/**
 * Public: Mark review as helpful
 */
export async function markReviewHelpful(id) {
  try {
    await fetch(`/api/reviews?action=helpful&id=${id}`, { method: 'POST' })
  } catch (e) {
    // Non-fatal
  }
}
