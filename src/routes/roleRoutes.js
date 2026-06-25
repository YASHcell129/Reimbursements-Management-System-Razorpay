const express = require('express');
const { assign } = require('../controllers/roleController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');
const { roleAssignmentSchema } = require('../utils/validators');

const router = express.Router();

router.post('/assign', authenticate, authorize('CFO'), validateRequest(roleAssignmentSchema), assign);

module.exports = router;
