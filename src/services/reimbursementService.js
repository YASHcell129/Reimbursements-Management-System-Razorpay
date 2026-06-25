const { query } = require('../config/database');
const { resolveReimbursementStatus } = require('./authService');

async function createReimbursement({ employeeId, title, description, amount }) {
  const result = await query(
    `INSERT INTO reimbursements (employee_id, title, description, amount, final_status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, employee_id, title, description, amount, final_status, created_at`,
    [employeeId, title, description, amount, 'PENDING']
  );
  return result.rows[0];
}

async function listReimbursements() {
  const result = await query('SELECT * FROM reimbursements ORDER BY created_at DESC');
  return result.rows;
}

async function listUserReimbursements(userId) {
  const result = await query('SELECT * FROM reimbursements WHERE employee_id = $1 ORDER BY created_at DESC', [userId]);
  return result.rows;
}

async function updateReimbursement({ reimbursementId, approverId, approverRole, status, remarks }) {
  const reimbursement = await query('SELECT id, employee_id, final_status FROM reimbursements WHERE id = $1', [reimbursementId]);
  if (reimbursement.rows.length === 0) {
    throw new Error('Reimbursement not found.');
  }

  const nextStatus = resolveReimbursementStatus(reimbursement.rows[0].final_status, approverRole, status);

  await query(
    `INSERT INTO reimbursement_actions (reimbursement_id, approver_id, approver_role, status, remarks)
     VALUES ($1, $2, $3, $4, $5)`,
    [reimbursementId, approverId, approverRole, status, remarks]
  );

  await query('UPDATE reimbursements SET final_status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [nextStatus, reimbursementId]);

  return { success: true, finalStatus: nextStatus };
}

module.exports = { createReimbursement, listReimbursements, listUserReimbursements, updateReimbursement };
