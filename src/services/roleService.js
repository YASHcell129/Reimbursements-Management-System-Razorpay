const { query } = require('../config/database');

async function assignRole({ actorId, targetEmail, role }) {
  const allowedRoles = ['RM', 'APE', 'CFO'];
  if (!allowedRoles.includes(role)) {
    throw new Error('Invalid role assignment.');
  }

  const actorResult = await query('SELECT role FROM users WHERE id = $1', [actorId]);
  const actor = actorResult.rows[0];
  if (!actor || actor.role !== 'CFO') {
    throw new Error('Only CFO can assign roles.');
  }

  const target = await query('SELECT id FROM users WHERE email = $1', [targetEmail]);
  if (target.rows.length === 0) {
    throw new Error('Target user not found.');
  }

  await query('UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [role, target.rows[0].id]);
  return { success: true, role };
}

module.exports = { assignRole };
