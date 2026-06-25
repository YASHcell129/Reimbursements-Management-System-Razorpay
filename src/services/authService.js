const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

function validateRegistrationInput({ name, email, password }) {
  if (!name || !email || !password) {
    return { isValid: false, message: 'Name, email, and password are required.' };
  }

  if (!email.endsWith('@org.com')) {
    return { isValid: false, message: 'Only emails ending with @org.com are allowed.' };
  }

  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long.' };
  }

  return { isValid: true };
}

function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '8h' });
}

async function registerUser({ name, email, password }) {
  const validation = validateRegistrationInput({ name, email, password });
  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    throw new Error('User already exists.');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const result = await query(
    'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
    [name, email, passwordHash, 'EMP']
  );

  return result.rows[0];
}

async function loginUser({ email, password }) {
  const result = await query('SELECT id, name, email, password_hash, role FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user) {
    throw new Error('Invalid credentials.');
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatches) {
    throw new Error('Invalid credentials.');
  }

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token: createToken({ id: user.id, role: user.role })
  };
}

function resolveReimbursementStatus(currentStatus, approverRole, actionStatus) {
  if (actionStatus === 'REJECTED') {
    return 'REJECTED';
  }

  if (approverRole === 'RM' && actionStatus === 'APPROVED') {
    return currentStatus === 'PENDING' ? 'RM_APPROVED' : 'APPROVED';
  }

  if (approverRole === 'APE' && actionStatus === 'APPROVED') {
    return currentStatus === 'RM_APPROVED' ? 'APPROVED' : 'RM_APPROVED';
  }

  return currentStatus;
}

module.exports = {
  validateRegistrationInput,
  createToken,
  registerUser,
  loginUser,
  resolveReimbursementStatus
};
