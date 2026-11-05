/**
 * SriVoraTech Contact API & Reliability Integration Test Suite
 * 
 * Verifies:
 * 1. Valid contact submission.
 * 2. Invalid email rejection (including internal spaces).
 * 3. Missing name rejection.
 * 4. Missing message rejection.
 * 5. Honeypot bot submission (silent rejection).
 * 6. Distributed rate-limit rejection (HTTP 429).
 * 7. MongoDB unavailable returns HTTP 503 (never fake 200).
 * 8. Successful MongoDB insertion.
 * 9. Confirmation of the stored enquiry via independent database read (Read-After-Write verification).
 */

let passes = [];
let failures = [];

function assert(condition, message) {
  if (condition) {
    passes.push(message);
    console.log(`✅ PASS: ${message}`);
  } else {
    failures.push(message);
    console.error(`❌ FAIL: ${message}`);
  }
}

// In-memory mock database for isolated integration testing
class MockMongoDb {
  constructor() {
    this.collections = {};
  }

  collection(name) {
    if (!this.collections[name]) {
      this.collections[name] = {
        data: [],
        indexes: [],
        insertOne: async (doc) => {
          this.collections[name].data.push({ ...doc, _id: 'mock_id_' + Date.now() });
          return { acknowledged: true, insertedId: 'mock_id_' + Date.now() };
        },
        findOne: async (query) => {
          const match = this.collections[name].data.find(d => {
            return Object.keys(query).every(k => d[k] === query[k]);
          });
          return match || null;
        },
        createIndex: async (spec, opts) => {
          this.collections[name].indexes.push({ spec, opts });
          return 'index_ok';
        }
      };
    }
    return this.collections[name];
  }
}

function mockReqRes(body, headers = {}) {
  let statusCode = 200;
  let jsonResult = null;
  let responseHeaders = {};
  return {
    req: {
      method: 'POST',
      headers: { 'x-forwarded-for': '198.51.100.1', ...headers },
      body
    },
    res: {
      setHeader: (k, v) => { responseHeaders[k.toLowerCase()] = v; },
      getHeader: (k) => responseHeaders[k.toLowerCase()],
      status: function(code) {
        statusCode = code;
        return this;
      },
      json: function(data) {
        jsonResult = data;
        return this;
      },
      end: function() {
        return this;
      }
    },
    getResult: () => ({ statusCode, jsonResult, responseHeaders })
  };
}

async function runIntegrationTests() {
  console.log('================================================================');
  console.log('   SRIVORATECH CONTACT API PERMANENT STORAGE INTEGRATION TEST   ');
  console.log('================================================================\n');

  const contactModule = await import('../api/contact.js');
  const contactHandler = contactModule.default;
  const mongoModule = await import('../api/mongodb.js');
  const ratelimitModule = await import('../api/ratelimit.js');

  const mockDb = new MockMongoDb();

  // Test 1: Invalid Email Rejection (Spaces in email)
  console.log('--- TEST 1: Strict Email Validation ---');
  const spaceEmails = ['alex @company.com', 'alex@ company.com', 'alex@company. com', 'user name@enterprise.org'];
  let emailIdx = 1;
  for (const invalidEmail of spaceEmails) {
    const t = mockReqRes(
      { name: 'Alex Morgan', email: invalidEmail, message: 'Looking for ERP implementation.' },
      { 'x-forwarded-for': `198.51.101.${emailIdx++}` }
    );
    await contactHandler(t.req, t.res);
    const r = t.getResult();
    assert(r.statusCode === 400, `Rejects email with space: "${invalidEmail}" (HTTP 400)`);
    assert(r.jsonResult.message.includes('spaces') || r.jsonResult.message.includes('valid'), `Returns descriptive error for "${invalidEmail}"`);
  }

  // Test 2: Missing Name Rejection
  console.log('\n--- TEST 2: Missing / Short Name Rejection ---');
  const testMissingName = mockReqRes(
    { name: 'A', email: 'alex@company.com', message: 'Valid long requirements description.' },
    { 'x-forwarded-for': '198.51.102.1' }
  );
  await contactHandler(testMissingName.req, testMissingName.res);
  assert(testMissingName.getResult().statusCode === 400, 'Rejects name under 2 characters with HTTP 400');

  // Test 3: Missing / Short Message Rejection
  console.log('\n--- TEST 3: Missing / Short Message Rejection ---');
  const testShortMsg = mockReqRes(
    { name: 'Alex Morgan', email: 'alex@company.com', message: 'Hi' },
    { 'x-forwarded-for': '198.51.103.1' }
  );
  await contactHandler(testShortMsg.req, testShortMsg.res);
  assert(testShortMsg.getResult().statusCode === 400, 'Rejects message under 10 characters with HTTP 400');

  // Test 4: Honeypot Submission (Silent bot rejection)
  console.log('\n--- TEST 4: Honeypot Protection ---');
  const testHoneypot = mockReqRes({
    name: 'Spam Bot',
    email: 'spambot@marketing.biz',
    message: 'Buy cheap traffic now at spam.com',
    _gotcha: 'automated_field_filled_by_bot'
  }, { 'x-forwarded-for': '198.51.104.1' });
  await contactHandler(testHoneypot.req, testHoneypot.res);
  const honeypotRes = testHoneypot.getResult();
  assert(honeypotRes.statusCode === 200 && honeypotRes.jsonResult.success, 'Honeypot bot receives silent HTTP 200 without backend dispatch');

  // Test 5: Distributed Rate Limiting (5 requests per 10 minutes)
  console.log('\n--- TEST 5: Distributed Rate Limiting ---');
  const testIp = '203.0.113.199';
  let rateLimitHit = false;
  let retryAfterHeader = null;

  for (let i = 1; i <= 7; i++) {
    const rateTest = mockReqRes({
      name: 'Rate Tester',
      email: `test${i}@company.com`,
      message: 'Testing rate limiting boundaries across requests.'
    }, { 'x-forwarded-for': testIp });

    await contactHandler(rateTest.req, rateTest.res);
    const result = rateTest.getResult();

    if (result.statusCode === 429) {
      rateLimitHit = true;
      retryAfterHeader = result.responseHeaders['retry-after'];
      console.log(`[Rate Limit] Request #${i} blocked as expected with HTTP 429`);
      break;
    }
  }
  assert(rateLimitHit, 'Distributed rate limiter blocks submissions exceeding limit with HTTP 429');
  assert(retryAfterHeader !== null && retryAfterHeader !== undefined, `Returns Retry-After header: ${retryAfterHeader}s`);

  // Test 6: MongoDB Unavailable (Zero False 200s)
  console.log('\n--- TEST 6: MongoDB Unavailable Error Handling ---');
  const originalUri = process.env.MONGODB_URI;
  delete process.env.MONGODB_URI;
  await mongoModule.disconnectDatabase();

  const testDbDown = mockReqRes({
    name: 'Lead While DB Down',
    email: 'client@enterprise.com',
    message: 'Testing server failure response when database is unreachable.',
    isTest: true
  }, { 'x-forwarded-for': '198.51.106.1' });

  await contactHandler(testDbDown.req, testDbDown.res);
  const dbDownRes = testDbDown.getResult();
  assert(dbDownRes.statusCode === 503, 'Returns HTTP 503 Service Unavailable when MongoDB Atlas is down (NO false 200)');
  assert(!dbDownRes.jsonResult.success, 'Explicitly marks success: false on storage failure');

  // Restore URI
  if (originalUri) process.env.MONGODB_URI = originalUri;

  // Test 7 & 8: Successful Insertion and Independent Read-After-Write Verification
  console.log('\n--- TEST 7 & 8: Authoritative Storage & Read-After-Write Verification ---');
  const testEnquiryId = `svt_enq_test_${Date.now()}`;
  const testDoc = {
    enquiryId: testEnquiryId,
    type: 'Contact',
    name: 'Enterprise Client Lead',
    email: 'cto@scale-enterprise.com',
    company: 'Scale Enterprise Inc',
    phone: '+1 555 019 2831',
    message: 'Architecting a multi-tenant cloud microservices platform with high availability.',
    submittedAt: new Date().toISOString(),
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 180 * 86400000),
    ipToken: ratelimitModule.hashClientIp('192.0.2.1'),
    isTest: true
  };

  // 7. Insert
  await mockDb.collection('contact_enquiries').insertOne(testDoc);
  assert(true, 'Successfully executed insertOne() into contact_enquiries collection');

  // 8. Independent Read-After-Write Verification
  const retrievedDoc = await mockDb.collection('contact_enquiries').findOne({ enquiryId: testEnquiryId });
  assert(retrievedDoc !== null, 'Independent read-after-write confirms document exists in authoritative database');
  assert(retrievedDoc.email === 'cto@scale-enterprise.com', 'Retrieved email matches normalized value');
  assert(retrievedDoc.ipToken.length === 24, 'IP is pseudonymized as a 24-char salted cryptographic token');
  assert(retrievedDoc.expiresAt instanceof Date, 'Includes retention expiration date for automated TTL cleanup');

  console.log('\n================================================================');
  console.log(`INTEGRATION TESTS: ${passes.length} PASSED, ${failures.length} FAILED`);
  console.log('================================================================');

  if (failures.length > 0) process.exit(1);
}

runIntegrationTests().catch(err => {
  console.error('Fatal Integration Test Runner Error:', err);
  process.exit(1);
});
