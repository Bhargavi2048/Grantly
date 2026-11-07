/**
 * Security & Input Sanitization Test Suite
 */

import assert from 'node:assert';

function sanitize(input) {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

function safeUrl(url) {
  if (!url) return '#';
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.href;
    }
  } catch {
    // Malformed
  }
  return '#';
}

function runSecurityTests() {
  console.log('🧪 Testing Security & Anti-XSS Sanitization...');

  // Test 1: Strip script tags
  const maliciousInput = '<script>alert("hacked")</script>Hello World';
  const clean = sanitize(maliciousInput);
  assert.strictEqual(clean, 'scriptalert("hacked")/scriptHello World', 'Dangerous brackets must be stripped');
  assert.strictEqual(clean.includes('<'), false);
  assert.strictEqual(clean.includes('>'), false);
  console.log('  ✓ Script tag bracket stripping verified');

  // Test 2: Neutralize inline event handlers
  const onclickAttack = 'button onclick=alert(1)';
  const sanitizedClick = sanitize(onclickAttack);
  assert.strictEqual(sanitizedClick.includes('onclick='), false);
  console.log('  ✓ Inline event handler neutralization verified');

  // Test 3: Safe URL validator
  const javascriptUri = 'javascript:alert(document.cookie)';
  assert.strictEqual(safeUrl(javascriptUri), '#', 'javascript: protocols must return #');

  const httpsUri = 'https://www.thegatesscholarship.org';
  assert.strictEqual(safeUrl(httpsUri), 'https://www.thegatesscholarship.org/', 'https: protocols must pass');
  console.log('  ✓ URI protocol validation verified');
}

export { runSecurityTests };
