const { query } = require('../config/database');

async function getEmployees() {
  const result = await query('SELECT id, name, email, role, created_at FROM users ORDER BY id ASC');
  return result.rows;
}

async function assignManager({ employeeId, managerId }) {
  const employee = await query('SELECT id FROM users WHERE id = $1', [employeeId]);
  const manager = await query('SELECT id FROM users WHERE id = $1', [managerId]);

  if (employee.rows.length === 0 || manager.rows.length === 0) {
    throw new Error('Employee or manager not found.');
  }

  await query(
    `INSERT INTO employee_manager (employee_id, manager_id)
     VALUES ($1, $2)
     ON CONFLICT (employee_id) DO UPDATE SET manager_id = EXCLUDED.manager_id`,
    [employeeId, managerId]
  );

  return { success: true };
}

async function removeManagerAssignment({ employeeId }) {
  await query('DELETE FROM employee_manager WHERE employee_id = $1', [employeeId]);
  return { success: true };
}

module.exports = { getEmployees, assignManager, removeManagerAssignment };
