const { assignRole } = require('../services/roleService');

async function assign(req, res, next) {
  try {
    const result = await assignRole({ actorId: req.user.id, targetEmail: req.body.email, role: req.body.role });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

module.exports = { assign };
