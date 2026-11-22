const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('--- LIVE HTML & ASSET AUDIT ---');
  const res = await fetch('https://www.srivoratech.in/');
  const html = res.body;

  console.log('1. Live HTML size:', html.length, 'bytes');
  console.log('2. Has gmail.com in HTML:', html.includes('gmail.com'));
  const dupCount = (html.match(/Who is Srikanth Badisa\?/g) || []).length;
  console.log('3. Standalone duplicate founder question count:', dupCount);
  console.log('4. Unified founder question present:', html.includes('Who is Badisa Srikanth (Srikanth Badisa)?'));
  console.log('5. Official founder email in HTML:', html.includes('srikanth@srivoratech.in'));
  console.log('6. Official sales email in HTML:', html.includes('contact@srivoratech.in'));

  // Extract JS bundle
  const scriptMatch = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
  if (scriptMatch) {
    const bundleUrl = 'https://www.srivoratech.in' + scriptMatch[1];
    console.log('7. Active JS bundle:', scriptMatch[1]);
    const jsRes = await fetch(bundleUrl);
    const js = jsRes.body;
    console.log('8. JS bundle size:', js.length, 'bytes');
    console.log('9. JS bundle has gmail.com:', js.includes('gmail.com'));
    console.log('10. JS bundle has incrementViewCount reference bug:', js.includes('incrementViewCount(') && !js.includes('function incrementViewCount'));
    console.log('11. JS bundle has tech-cards-grid:', js.includes('tech-cards-grid'));
  }

  // Extract CSS bundle
  const cssMatch = html.match(/href="(\/assets\/index-[^"]+\.css)"/);
  if (cssMatch) {
    const cssUrl = 'https://www.srivoratech.in' + cssMatch[1];
    console.log('12. Active CSS bundle:', cssMatch[1]);
    const cssRes = await fetch(cssUrl);
    const css = cssRes.body;
    console.log('13. CSS bundle size:', css.length, 'bytes');
    console.log('14. CSS has scroll-margin-top: 100px:', css.includes('scroll-margin-top:100px') || css.includes('scroll-margin-top: 100px'));
    console.log('15. CSS has 3D preserve-3d:', css.includes('preserve-3d'));
    console.log('16. CSS has footer-top grid:', css.includes('footer-top') && css.includes('grid-template-columns'));
  }

  console.log('\n--- ALL LIVE ASSET AUDIT CHECKS FINISHED ---');
}

run().catch(console.error);
