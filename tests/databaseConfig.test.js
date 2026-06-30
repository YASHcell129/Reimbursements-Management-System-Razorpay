const test = require('node:test');
const assert = require('node:assert/strict');

const database = require('../src/config/database');

test('database config exposes drizzle-compatible exports', () => {
  assert.equal(typeof database.query, 'function');
  assert.equal(typeof database.db, 'object');
  assert.equal(typeof database.drizzleClient, 'object');
});
