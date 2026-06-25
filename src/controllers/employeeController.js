const { getEmployees, assignManager, removeManagerAssignment } = require('../services/employeeService');

async function listEmployees(_req, res, next) {
  try {
    const employees = await getEmployees();
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    next(error);
  }
}

async function assignEmployeeManager(req, res, next) {
  try {
    const result = await assignManager({ employeeId: req.body.employeeId, managerId: req.body.managerId });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

async function removeEmployeeManager(req, res, next) {
  try {
    try {
      const result = await removeManagerAssignment({ employeeId: req.body.employeeId });
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { listEmployees, assignEmployeeManager, removeEmployeeManager };
