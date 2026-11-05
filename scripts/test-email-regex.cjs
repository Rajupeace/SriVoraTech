function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email address is required.' };
  }
  if (/\s/.test(email)) {
    return { valid: false, error: 'Email address must not contain spaces or whitespace.' };
  }
  const trimmed = email.trim();
  if (trimmed.length > 254) {
    return { valid: false, error: 'Email address must not exceed 254 characters.' };
  }
  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { valid: false, error: 'Email must contain exactly one "@" symbol.' };
  }
  const [local, domain] = parts;
  if (!local || local.length > 64) {
    return { valid: false, error: 'Email local part must be between 1 and 64 characters.' };
  }
  if (!domain || domain.length > 253) {
    return { valid: false, error: 'Email domain part must be between 1 and 253 characters.' };
  }
  if (local.includes('..') || domain.includes('..')) {
    return { valid: false, error: 'Email must not contain consecutive dots.' };
  }
  if (local.startsWith('.') || local.endsWith('.')) {
    return { valid: false, error: 'Email local part must not start or end with a dot.' };
  }
  const strictEmailRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  if (!strictEmailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid official email address.' };
  }
  return { valid: true, normalized: trimmed.toLowerCase() };
}

const testCases = [
  // Should PASS
  { email: 'alex@company.com', expected: true },
  { email: 'srikanth@srivoratech.in', expected: true },
  { email: 'contact.team+lead@enterprise.co.uk', expected: true },
  { email: 'user.name123@sub.domain.org', expected: true },
  
  // Should FAIL
  { email: 'alex @company.com', expected: false },
  { email: 'alex@ company.com', expected: false },
  { email: 'alex@company. com', expected: false },
  { email: ' alex@company.com', expected: false },
  { email: 'alex@company.com ', expected: false },
  { email: 'alex@company', expected: false },
  { email: 'alex@.com', expected: false },
  { email: '@company.com', expected: false },
  { email: 'alex..morgan@company.com', expected: false },
  { email: 'alex@company..com', expected: false },
  { email: '.alex@company.com', expected: false },
  { email: 'alex.@company.com', expected: false },
  { email: 'alex@company.c', expected: false },
  { email: '', expected: false },
  { email: null, expected: false },
  { email: 'a'.repeat(65) + '@company.com', expected: false },
];

let failed = 0;
for (const tc of testCases) {
  const res = validateEmail(tc.email);
  if (res.valid !== tc.expected) {
    console.error(`FAILED: "${tc.email}" expected ${tc.expected}, got ${res.valid} (${res.error})`);
    failed++;
  } else {
    console.log(`PASSED: "${tc.email}" -> valid: ${res.valid} ${res.normalized ? `(normalized: ${res.normalized})` : `(${res.error})`}`);
  }
}

if (failed > 0) {
  process.exit(1);
} else {
  console.log(`\nALL ${testCases.length} EMAIL VALIDATION TESTS PASSED!`);
}
