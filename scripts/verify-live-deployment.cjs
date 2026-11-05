const https = require('https');

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function verifyLive() {
  console.log('========================================================');
  console.log('   SRIVORATECH QA ROUND 2: LIVE PRODUCTION AUDIT        ');
  console.log('========================================================\n');

  // Test 1: Apex Redirect
  console.log('1. Checking Apex Redirect (https://srivoratech.in/)...');
  try {
    const apex = await fetchUrl('https://srivoratech.in/', { method: 'GET' });
    console.log(`Apex status: ${apex.statusCode}, Location: ${apex.headers.location || 'none'}`);
  } catch (e) {
    console.log(`Apex check error: ${e.message}`);
  }

  // Test 2: Live Homepage
  console.log('\n2. Checking Live Homepage (https://www.srivoratech.in/)...');
  const home = await fetchUrl('https://www.srivoratech.in/');
  console.log(`Homepage status: ${home.statusCode}`);
  const hasOldPercentages = home.body.includes('92% faster') || home.body.includes('100% Data Protection');
  console.log(`Contains removed false metrics: ${hasOldPercentages ? 'YES (stale cache)' : 'NO (clean)'}`);

  // Test 3: robots.txt
  console.log('\n3. Checking robots.txt...');
  const robots = await fetchUrl('https://www.srivoratech.in/robots.txt');
  console.log(`robots.txt status: ${robots.statusCode}`);
  console.log(`Contains Disallow: /seo-dashboard: ${robots.body.includes('Disallow: /seo-dashboard')}`);
  console.log(`Contains canonical sitemap URL: ${robots.body.includes('https://www.srivoratech.in/sitemap.xml')}`);

  // Test 4: sitemap.xml
  console.log('\n4. Checking sitemap.xml...');
  const sitemap = await fetchUrl('https://www.srivoratech.in/sitemap.xml');
  console.log(`sitemap.xml status: ${sitemap.statusCode}`);
  console.log(`Excludes /seo-dashboard: ${!sitemap.body.includes('/seo-dashboard')}`);
  console.log(`Uses https://www.srivoratech.in: ${sitemap.body.includes('https://www.srivoratech.in/')}`);

  // Test 5: Live Reviews API
  console.log('\n5. Checking Live Reviews API (GET /api/reviews)...');
  try {
    const reviews = await fetchUrl('https://www.srivoratech.in/api/reviews');
    console.log(`Reviews API status: ${reviews.statusCode}`);
    let data = {};
    try { data = JSON.parse(reviews.body); } catch(e) {}
    console.log(`Reviews count: ${data.totalCount !== undefined ? data.totalCount : data.reviews?.length}`);
    console.log(`Average rating: ${data.averageRating}`);
    console.log(`Has founder testimonials: ${reviews.body.includes('Badisa Srikanth') || reviews.body.includes('Sai Manindra')}`);
  } catch (e) {
    console.log(`Reviews API test error: ${e.message}`);
  }

  // Test 6: Live Contact API Validation
  console.log('\n6. Checking Live Contact API Validation (POST /api/contact)...');
  try {
    const invalidContact = await fetchUrl('https://www.srivoratech.in/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'T' })
    });
    console.log(`Invalid submission status: ${invalidContact.statusCode} (Expected: 400)`);
    console.log(`Response message: ${invalidContact.body}`);

    // Live Clean Submission
    const validContact = await fetchUrl('https://www.srivoratech.in/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Production Verification QA',
        email: 'qa-verify@srivoratech.in',
        phone: '+919182030946',
        company: 'SriVoraTech Audit Bot',
        service: 'Full-Stack Development',
        message: 'Automated live production verification test payload for contact pipeline.'
      })
    });
    console.log(`Valid submission status: ${validContact.statusCode} (Expected: 200)`);
    console.log(`Valid submission response: ${validContact.body}`);
  } catch (e) {
    console.log(`Contact API test error: ${e.message}`);
  }

  console.log('\n========================================================');
  console.log('   LIVE AUDIT COMPLETE                                  ');
  console.log('========================================================');
}

verifyLive().catch(console.error);
