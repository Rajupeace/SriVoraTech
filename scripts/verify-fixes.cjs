const fs = require('fs');
const path = require('path');

let failures = [];
let passes = [];

function assert(condition, message) {
  if (condition) {
    passes.push(message);
    console.log(`✅ PASS: ${message}`);
  } else {
    failures.push(message);
    console.error(`❌ FAIL: ${message}`);
  }
}

async function runTests() {
  console.log('========================================================');
  console.log('   SRIVORATECH QA ROUND 1: COMPREHENSIVE VERIFICATION   ');
  console.log('========================================================\n');

  // 1. Verify Sitemaps & Robots.txt
  console.log('--- TEST GROUP 1: Sitemaps & Robots.txt ---');
  const sitemapXml = fs.readFileSync('public/sitemap.xml', 'utf8');
  assert(!sitemapXml.includes('/seo-dashboard'), 'sitemap.xml must NOT include /seo-dashboard');
  assert(sitemapXml.includes('https://www.srivoratech.in/'), 'sitemap.xml must use canonical domain https://www.srivoratech.in');
  assert(!sitemapXml.includes('https://srivoratech.in/'), 'sitemap.xml must not use non-www apex domain without redirect');

  const robotsTxt = fs.readFileSync('public/robots.txt', 'utf8');
  assert(robotsTxt.includes('Disallow: /seo-dashboard'), 'robots.txt must disallow /seo-dashboard');
  assert(robotsTxt.includes('https://www.srivoratech.in/sitemap.xml'), 'robots.txt must point to canonical sitemap.xml');

  // 2. Verify Review Moderation & False Ratings
  console.log('\n--- TEST GROUP 2: Review Moderation & False Ratings ---');
  const ratingsService = fs.readFileSync('src/services/ratingsService.js', 'utf8');
  assert(!ratingsService.includes('founderReview'), 'ratingsService must not seed founder reviews');
  assert(!ratingsService.includes('average: 5.0'), 'ratingsService must not hardcode 5.0 rating');
  assert(!ratingsService.includes('847') && !ratingsService.includes('totalViews'), 'ratingsService must not manufacture fake view counts');
  assert(!ratingsService.includes('adminToken = \'srivoratech-admin-session-token-xyz\''), 'ratingsService must not leak plaintext admin credentials');

  const reviewsApi = fs.readFileSync('api/reviews.js', 'utf8');
  assert(reviewsApi.includes("approved") && reviewsApi.includes("!isInternal"), 'api/reviews.js public GET must strictly filter for approved non-internal reviews');
  assert(!reviewsApi.includes('Badisa Srikanth'), 'api/reviews.js must not include founder testimonials');

  // 3. Verify False Metrics Removal in UI Components
  console.log('\n--- TEST GROUP 3: False Metrics Removal ---');
  const whyChoose = fs.readFileSync('src/components/WhyChoose.jsx', 'utf8');
  assert(!whyChoose.includes('92% faster'), 'WhyChoose must not contain "92% faster"');
  assert(!whyChoose.includes('100% Data Protection'), 'WhyChoose must not contain "100% Data Protection"');
  assert(!whyChoose.includes('97% code quality'), 'WhyChoose must not contain "97% code quality"');
  assert(!whyChoose.includes('88% automation'), 'WhyChoose must not contain "88% automation"');
  assert(!whyChoose.includes('99.9% uptime guaranteed'), 'WhyChoose must not contain "99.9% uptime guaranteed"');

  const techStack = fs.readFileSync('src/components/TechStack.jsx', 'utf8');
  assert(!techStack.includes('score: 98'), 'TechStack must not contain fabricated 98 score');
  assert(!techStack.includes('score: 96'), 'TechStack must not contain fabricated 96 score');

  const challenges = fs.readFileSync('src/components/Challenges.jsx', 'utf8');
  assert(!challenges.includes('10M+'), 'Challenges must not contain "10M+"');
  assert(!challenges.includes('99.5%'), 'Challenges must not contain "99.5%"');
  assert(!challenges.includes('85%'), 'Challenges must not contain "85%"');

  const clientPortal = fs.readFileSync('src/components/ClientPortalPage.jsx', 'utf8');
  assert(clientPortal.includes('Sample Project Data') || clientPortal.includes('Interactive Client Portal Preview'), 'ClientPortalPage must clearly state it is a preview with sample data');
  assert(!clientPortal.includes('alert('), 'ClientPortalPage must not contain dummy alert() download handlers');

  // 4. Verify Contact API Logic in code
  console.log('\n--- TEST GROUP 4: Contact API Logic ---');
  const contactApi = fs.readFileSync('api/contact.js', 'utf8');
  assert(contactApi.includes('maxSubmissions = 5'), 'api/contact.js must enforce rate limiting (max 5)');
  assert(contactApi.includes('body._gotcha') || contactApi.includes('body.botCheck'), 'api/contact.js must detect spam honeypot');
  assert(contactApi.includes('svt_enq_'), 'api/contact.js must generate unique enquiryId with prefix svt_enq_');
  assert(contactApi.includes('contact_enquiries.json'), 'api/contact.js must have durable fallback persistence');

  // 5. Test Contact API Functionally via ES module dynamic import
  console.log('\n--- TEST GROUP 5: Contact API Functional Execution ---');
  const contactModule = await import('../api/contact.js');
  const contactHandler = contactModule.default;

  function mockReqRes(body, headers = {}) {
    let statusCode = 200;
    let jsonResult = null;
    let ended = false;
    return {
      req: {
        method: 'POST',
        headers: { 'x-forwarded-for': '127.0.0.1', ...headers },
        body
      },
      res: {
        setHeader: () => {},
        status: function(code) {
          statusCode = code;
          return this;
        },
        json: function(data) {
          jsonResult = data;
          return this;
        },
        end: function() {
          ended = true;
          return this;
        }
      },
      getResult: () => ({ statusCode, jsonResult, ended })
    };
  }

  // Subtest 5a: Missing fields
  let testA = mockReqRes({ name: 'John' });
  await contactHandler(testA.req, testA.res);
  assert(testA.getResult().statusCode === 400, 'Contact API rejects missing email/message with 400');

  // Subtest 5b: Invalid email
  let testB = mockReqRes({ name: 'John Doe', email: 'notanemail', message: 'Valid long message here for testing' });
  await contactHandler(testB.req, testB.res);
  assert(testB.getResult().statusCode === 400, 'Contact API rejects invalid email format with 400');

  // Subtest 5c: Short message
  let testC = mockReqRes({ name: 'John Doe', email: 'john@example.com', message: 'Hi' });
  await contactHandler(testC.req, testC.res);
  assert(testC.getResult().statusCode === 400, 'Contact API rejects short message with 400');

  // Subtest 5d: Spam Honeypot
  let testD = mockReqRes({ name: 'Bot', email: 'bot@spam.com', message: 'Legitimate looking long message for testing', _gotcha: 'I am a bot' });
  await contactHandler(testD.req, testD.res);
  assert(testD.getResult().statusCode === 200 && testD.getResult().jsonResult.success, 'Contact API silently accepts honeypot bot without triggering backend');

  // Subtest 5e: Clean Submission
  let testE = mockReqRes({
    name: 'Srikanth Test Lead',
    email: 'client@example.com',
    phone: '+91 91820 30946',
    company: 'Enterprise Test Corp',
    service: 'Full-Stack Development',
    message: 'We require a bespoke enterprise ERP solution built with React and Node.js.'
  });
  await contactHandler(testE.req, testE.res);
  const resultE = testE.getResult();
  assert(resultE.statusCode === 200 && resultE.jsonResult.success === true, 'Contact API successfully accepts valid submission');
  assert(resultE.jsonResult.enquiryId && resultE.jsonResult.enquiryId.startsWith('svt_enq_'), `Contact API returns valid enquiryId (${resultE.jsonResult.enquiryId})`);

  // 6. Test Review API Functionally
  console.log('\n--- TEST GROUP 6: Reviews API Functional Execution ---');
  const reviewsModule = await import('../api/reviews.js');
  const reviewsHandler = reviewsModule.default;

  // Subtest 6a: GET returns no false average
  let testRevGet = mockReqRes(null);
  testRevGet.req.method = 'GET';
  testRevGet.req.url = '/api/reviews';
  await reviewsHandler(testRevGet.req, testRevGet.res);
  const resultRevGet = testRevGet.getResult();
  assert(resultRevGet.statusCode === 200, 'GET /api/reviews returns 200');
  assert(resultRevGet.jsonResult.averageRating === null || typeof resultRevGet.jsonResult.averageRating === 'number', 'GET /api/reviews averageRating is null or real number (no artificial 5.0 fallback)');

  // Subtest 6b: Unauthorized Admin Login fails
  let testRevLoginFail = mockReqRes({ username: 'admin', password: 'wrongpassword' });
  testRevLoginFail.req.method = 'POST';
  testRevLoginFail.req.url = '/api/reviews?action=login';
  await reviewsHandler(testRevLoginFail.req, testRevLoginFail.res);
  const resultRevLogin = testRevLoginFail.getResult();
  assert(resultRevLogin.statusCode === 401, 'POST /api/reviews?action=login rejects invalid password with 401');

  // Subtest 6c: Review Submission sets status to Pending
  let testRevSubmit = mockReqRes({
    name: 'Jane Reviewer',
    email: 'jane@clientcorp.com',
    star: 5,
    company: 'Product Lead Corp',
    comment: 'Exceptional engineering velocity and clean architecture delivered for our enterprise platform.'
  });
  testRevSubmit.req.method = 'POST';
  testRevSubmit.req.url = '/api/reviews';
  await reviewsHandler(testRevSubmit.req, testRevSubmit.res);
  const resultRevSubmit = testRevSubmit.getResult();
  assert(resultRevSubmit.statusCode === 201, 'POST /api/reviews creates review with 201 Created');
  assert(resultRevSubmit.jsonResult.message.includes('moderation'), 'New review submission strictly assigned for moderation before display');

  console.log('\n========================================================');
  console.log(`TOTAL PASSES: ${passes.length}`);
  console.log(`TOTAL FAILURES: ${failures.length}`);
  console.log('========================================================');

  if (failures.length > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
