const https = require('https');

function fetch(url, options = {}) {
  return new Promise((resolve) => {
    const parsed = new URL(url);
    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port || 443,
      path: parsed.pathname + parsed.search,
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'SriVoraLiveAuditor/1.0',
        ...(options.headers || {})
      }
    };

    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        url,
        status: res.statusCode,
        headers: res.headers,
        body: data
      }));
    });
    req.on('error', (err) => resolve({ url, status: 'ERROR', error: err.message, body: '' }));
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function inspectLive() {
  console.log('--- 1. TESTING PRODUCTION DOMAIN ROOT ---');
  const root = await fetch('https://www.srivoratech.in/');
  console.log('Root URL: https://www.srivoratech.in/');
  console.log('HTTP Status:', root.status);
  console.log('HTML Byte Length:', root.body ? root.body.length : 0);
  console.log('Content-Type:', root.headers['content-type']);
  console.log('Server:', root.headers['server']);
  console.log('Cache-Control:', root.headers['cache-control']);
  console.log('Security Headers:');
  console.log('  x-frame-options:', root.headers['x-frame-options']);
  console.log('  x-content-type-options:', root.headers['x-content-type-options']);
  console.log('  referrer-policy:', root.headers['referrer-policy']);
  
  // Extract script and link tags from root HTML
  const scriptRegex = /src=["']([^"']+\.js)["']/g;
  const cssRegex = /href=["']([^"']+\.css)["']/g;
  
  const scripts = [];
  let match;
  while ((match = scriptRegex.exec(root.body)) !== null) {
    scripts.push(match[1]);
  }
  const cssList = [];
  while ((match = cssRegex.exec(root.body)) !== null) {
    cssList.push(match[1]);
  }

  console.log('\n--- 2. CHECKING BUNDLE ASSETS ---');
  for (const asset of [...scripts, ...cssList]) {
    const assetUrl = asset.startsWith('http') ? asset : 'https://www.srivoratech.in' + (asset.startsWith('/') ? '' : '/') + asset;
    const res = await fetch(assetUrl);
    console.log(`Asset: ${asset.padEnd(45)} -> Status: ${res.status} (${res.body ? res.body.length : 0} bytes)`);
  }

  console.log('\n--- 3. CHECKING ALL USER-FACING ROUTES (SPA REWRITES) ---');
  const routes = [
    '/',
    '/about',
    '/services',
    '/case-studies',
    '/founder',
    '/careers',
    '/blog',
    '/pricing',
    '/privacy',
    '/terms',
    '/client-portal',
    '/sitemap.xml',
    '/robots.txt'
  ];

  for (const r of routes) {
    const res = await fetch('https://www.srivoratech.in' + r);
    const pass = res.status === 200 ? 'PASS' : 'FAIL';
    console.log(`[${pass}] Route: ${r.padEnd(20)} -> Status: ${res.status}`);
  }

  console.log('\n--- 4. TESTING LIVE SERVERLESS CONTACT API ---');
  const payload = JSON.stringify({
    name: 'Live Website Auditor',
    email: 'auditor@srivoratech.in',
    phone: '+91 9999999999',
    company: 'SriVora Verification Suite',
    budget: '$5,000 - $10,000',
    message: 'Auditing live production serverless endpoint'
  });

  const apiRes = await fetch('https://www.srivoratech.in/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    },
    body: payload
  });
  console.log('POST /api/contact -> Status:', apiRes.status);
  console.log('Response body:', apiRes.body);

  console.log('\n--- 5. CHECKING REDIRECTS (APEX TO WWW) ---');
  const apex = await fetch('https://srivoratech.in/');
  console.log('Apex URL (https://srivoratech.in/) -> Status:', apex.status, 'Location:', apex.headers['location']);

  console.log('\n=== AUDIT COMPLETE ===');
}

inspectLive();

