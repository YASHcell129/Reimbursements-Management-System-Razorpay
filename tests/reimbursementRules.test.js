const test = require('node:test');
const assert = require('node:assert/strict');

const { resolveReimbursementStatus, validateRegistrationInput } = require('../src/services/authService');

test('validateRegistrationInput rejects non-org emails', () => {
  const result = validateRegistrationInput({
    name: 'Alice',
    email: 'alice@gmail.com',
    password: 'Password123!'
  });

  assert.equal(result.isValid, false);
  assert.match(result.message, /@org.com/i);
});

test('resolveReimbursementStatus reaches approved only after RM and APE approvals', () => {
  let status = resolveReimbursementStatus('PENDING', 'RM', 'APPROVED');
  assert.equal(status, 'RM_APPROVED');

  status = resolveReimbursementStatus(status, 'APE', 'APPROVED');
  assert.equal(status, 'APPROVED');
});

test('resolveReimbursementStatus rejects immediately on rejection', () => {
  const status = resolveReimbursementStatus('PENDING', 'RM', 'REJECTED');
  assert.equal(status, 'REJECTED');
});
