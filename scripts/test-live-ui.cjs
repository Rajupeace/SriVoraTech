const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function verifyLive() {
  console.log('=== VERIFYING LIVE SITE (https://www.srivoratech.in/) ===\n');

  // 1. Home page HTML & assets
  const home = await fetchUrl('https://www.srivoratech.in/');
  console.log(`1. Homepage Status: ${home.status} (Length: ${home.body.length} bytes)`);

  // Check that index bundle has our new commit assets
  const jsMatch = home.body.match(/\/assets\/index-[A-Za-z0-9_-]+\.js/);
  const cssMatch = home.body.match(/\/assets\/index-[A-Za-z0-9_-]+\.css/);

  console.log(`2. Main JS Bundle: ${jsMatch ? jsMatch[0] : 'NOT FOUND'}`);
  console.log(`3. Main CSS Bundle: ${cssMatch ? cssMatch[0] : 'NOT FOUND'}`);

  if (jsMatch) {
    const js = await fetchUrl('https://www.srivoratech.in' + jsMatch[0]);
    console.log(`4. JS Bundle Status: ${js.status} (${js.body.length} bytes)`);

    // Verify key UI updates in bundle
    const hasSentenceH1 = js.body.includes('Architecting ') && js.body.includes('intelligent systems') && js.body.includes('that scale globally.');
    const hasStaticProofPoints = js.body.includes('Iterative Agile Sprints') && js.body.includes('Full Source Code Ownership') && js.body.includes('Cloud Architecture');
    const hasSvgLogos = js.body.includes('0 0 180 180') || js.body.includes('0 0 54 33'); // NextLogo or TailwindLogo
    const hasUnifiedHeader = js.body.includes('site-header') && js.body.includes('header-container');

    console.log(`   - Sentence Case H1 present: ${hasSentenceH1 ? '✅ YES' : '❌ NO'}`);
    console.log(`   - Static 3-Pillar Proof Points present: ${hasStaticProofPoints ? '✅ YES' : '❌ NO'}`);
    console.log(`   - Authentic SVG Brand Logos present: ${hasSvgLogos ? '✅ YES' : '❌ NO'}`);
    console.log(`   - Unified 3-zone Header present: ${hasUnifiedHeader ? '✅ YES' : '❌ NO'}`);
  }

  if (cssMatch) {
    const css = await fetchUrl('https://www.srivoratech.in' + cssMatch[0]);
    console.log(`5. CSS Bundle Status: ${css.status} (${css.body.length} bytes)`);
    const hasScrollMargin = css.body.includes('scroll-margin-top:100px') || css.body.includes('scroll-margin-top: 100px');
    const hasProofPointsCss = css.body.includes('proof-points-grid') || css.body.includes('proof-points-section');
    const hasHeaderCss = css.body.includes('site-header') || css.body.includes('header-container');

    console.log(`   - 100px scroll offset: ${hasScrollMargin ? '✅ YES' : '❌ NO'}`);
    console.log(`   - Proof points grid styling: ${hasProofPointsCss ? '✅ YES' : '❌ NO'}`);
    console.log(`   - Unified header styling: ${hasHeaderCss ? '✅ YES' : '❌ NO'}`);
  }

  // 6. Subpages checks
  const subpages = ['/client-portal', '/blog', '/sitemap', '/about', '/pricing'];
  for (const page of subpages) {
    const res = await fetchUrl(`https://www.srivoratech.in${page}`);
    console.log(`6. Subpage ${page}: Status ${res.status} (${res.body.length} bytes)`);
  }

  console.log('\n=== ALL LIVE VERIFICATIONS COMPLETE ===');
}

verifyLive().catch(err => {
  console.error('Error during live verification:', err);
  process.exit(1);
});
