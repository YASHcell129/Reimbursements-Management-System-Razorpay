const { createReimbursement, listReimbursements, listUserReimbursements, updateReimbursement } = require('../services/reimbursementService');

async function create(req, res, next) {
  try {
    const reimbursement = await createReimbursement({
      employeeId: req.user.id,
      title: req.body.title,
      description: req.body.description,
      amount: req.body.amount
    });
    res.status(201).json({ success: true, data: reimbursement });
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    const reimbursements = await listReimbursements();
    res.status(200).json({ success: true, data: reimbursements });
  } catch (error) {
    next(error);
  }
}

async function listByUser(req, res, next) {
  try {
    const reimbursements = await listUserReimbursements(req.params.userId);
    res.status(200).json({ success: true, data: reimbursements });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const result = await updateReimbursement({
      reimbursementId: req.body.reimbursementId,
      approverId: req.user.id,
      approverRole: req.user.role,
      status: req.body.status,
      remarks: req.body.remarks
    });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

module.exports = { create, list, listByUser, update };
