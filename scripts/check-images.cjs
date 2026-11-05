const https = require('https');

function fetchStatus(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode, contentType: res.headers['content-type'], size: res.headers['content-length'] });
    }).on('error', (err) => resolve({ url, status: 'ERROR', error: err.message }));
  });
}

async function checkImages() {
  const assets = [
    'https://www.srivoratech.in/assets/badisa_srikanth-Cu2OVCnk.jpg',
    'https://www.srivoratech.in/assets/vamsi_krishna-DzB75t3P.jpg',
    'https://www.srivoratech.in/assets/sai_manindra-JBJcNFzH.jpg',
    'https://www.srivoratech.in/favicon.ico',
    'https://www.srivoratech.in/logo.png',
    'https://www.srivoratech.in/sitemap.xml',
    'https://www.srivoratech.in/robots.txt'
  ];

  console.log('--- CHECKING KEY STATIC ASSETS ---');
  for (const url of assets) {
    const res = await fetchStatus(url);
    console.log(`[${res.status === 200 ? 'OK' : 'FAIL'}] ${url.padEnd(65)} -> Status: ${res.status} (${res.contentType})`);
  }
}

checkImages();

