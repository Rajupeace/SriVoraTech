import http from 'http'
import { spawn } from 'child_process'

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = ''
      res.on('data', chunk => body += chunk)
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body
        })
      })
    })

    req.on('error', err => reject(err))

    if (postData) {
      req.write(postData)
    }
    req.end()
  })
}

async function runVerification() {
  console.log('── STARTING PHASE 11 & 12 VERIFICATION ──\n')

  // Start server
  const serverProcess = spawn('node', ['server.js'], { stdio: ['ignore', 'pipe', 'pipe'] })
  let serverOutput = ''
  serverProcess.stdout.on('data', data => serverOutput += data.toString())
  serverProcess.stderr.on('data', data => serverOutput += data.toString())

  // Wait 2 seconds for server boot
  await new Promise(r => setTimeout(r, 2000))

  const results = []

  try {
    // 1. Health check
    console.log('Test 1: GET /api/health')
    const health = await makeRequest({ hostname: 'localhost', port: 3001, path: '/api/health', method: 'GET' })
    results.push({ test: 'API Health', pass: health.statusCode === 200, status: health.statusCode })
    console.log(`  Result: ${health.statusCode === 200 ? 'PASS' : 'FAIL'} (${health.statusCode})`)

    // 2. Reviews API
    console.log('Test 2: GET /api/reviews')
    const reviews = await makeRequest({ hostname: 'localhost', port: 3001, path: '/api/reviews', method: 'GET' })
    const reviewsParsed = JSON.parse(reviews.body)
    const validRatings = reviewsParsed.success && reviewsParsed.totalCount > 0
    results.push({ test: 'Reviews API', pass: validRatings, details: `Count: ${reviewsParsed.totalCount}, Avg: ${reviewsParsed.averageRating}` })
    console.log(`  Result: ${validRatings ? 'PASS' : 'FAIL'} (Found ${reviewsParsed.totalCount} approved reviews, avg ${reviewsParsed.averageRating})`)

    // 3. Contact Form Submission
    console.log('Test 3: POST /api/contact')
    const contactPayload = JSON.stringify({
      name: 'QA Test Verification',
      email: 'qa.test@example.com',
      phone: '+91 9999999999',
      company: 'QA Audit Labs',
      budget: '₹1,00,000 - ₹5,00,000',
      message: 'Automated end-to-end verification test inquiry.'
    })
    const contactRes = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/contact',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(contactPayload)
      }
    }, contactPayload)
    const contactSuccess = contactRes.statusCode === 200
    results.push({ test: 'Contact API Submission', pass: contactSuccess, status: contactRes.statusCode })
    console.log(`  Result: ${contactSuccess ? 'PASS' : 'FAIL'} (${contactRes.statusCode})`)

    // 4. Sitemap XML
    console.log('Test 4: GET /sitemap.xml')
    const sitemap = await makeRequest({ hostname: 'localhost', port: 3001, path: '/sitemap.xml', method: 'GET' })
    const sitemapValid = sitemap.statusCode === 200 && sitemap.body.includes('<urlset') && sitemap.body.includes('/privacy')
    results.push({ test: 'Sitemap XML', pass: sitemapValid, status: sitemap.statusCode })
    console.log(`  Result: ${sitemapValid ? 'PASS' : 'FAIL'} (Contains /privacy and valid XML)`)

    // 5. Robots.txt
    console.log('Test 5: GET /robots.txt')
    const robots = await makeRequest({ hostname: 'localhost', port: 3001, path: '/robots.txt', method: 'GET' })
    const robotsValid = robots.statusCode === 200 && robots.body.includes('User-agent:')
    results.push({ test: 'Robots TXT', pass: robotsValid, status: robots.statusCode })
    console.log(`  Result: ${robotsValid ? 'PASS' : 'FAIL'} (${robots.statusCode})`)

    // 6. SPA fallback for /privacy
    console.log('Test 6: GET /privacy (SPA HTML fallback)')
    const privacy = await makeRequest({ hostname: 'localhost', port: 3001, path: '/privacy', method: 'GET' })
    const privacyValid = privacy.statusCode === 200 && privacy.body.includes('<div id="root">')
    results.push({ test: 'SPA Fallback (/privacy)', pass: privacyValid, status: privacy.statusCode })
    console.log(`  Result: ${privacyValid ? 'PASS' : 'FAIL'} (${privacy.statusCode})`)

    // 7. SPA fallback for /client-portal
    console.log('Test 7: GET /client-portal (SPA HTML fallback)')
    const portal = await makeRequest({ hostname: 'localhost', port: 3001, path: '/client-portal', method: 'GET' })
    const portalValid = portal.statusCode === 200 && portal.body.includes('<div id="root">')
    results.push({ test: 'SPA Fallback (/client-portal)', pass: portalValid, status: portal.statusCode })
    console.log(`  Result: ${portalValid ? 'PASS' : 'FAIL'} (${portal.statusCode})`)

  } catch (err) {
    console.error('Verification error:', err)
  } finally {
    serverProcess.kill()
    console.log('\n── VERIFICATION SUMMARY ──')
    const allPassed = results.every(r => r.pass)
    console.log(`Total tests: ${results.length}`)
    console.log(`Passed: ${results.filter(r => r.pass).length}`)
    console.log(`Failed: ${results.filter(r => !r.pass).length}`)
    console.log(`Overall Status: ${allPassed ? 'ALL TESTS PASSED ✅' : 'FAILURES DETECTED ❌'}`)
  }
}

runVerification()

