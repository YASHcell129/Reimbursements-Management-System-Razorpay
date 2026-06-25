const express = require('express');
const { listEmployees, assignEmployeeManager, removeEmployeeManager } = require('../controllers/employeeController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');
const { employeeAssignmentSchema } = require('../utils/validators');

const router = express.Router();

router.get('/', authenticate, authorize('CFO', 'RM', 'APE'), listEmployees);
router.post('/assign', authenticate, authorize('CFO', 'RM'), validateRequest(employeeAssignmentSchema), assignEmployeeManager);
router.delete('/assign', authenticate, authorize('CFO', 'RM'), validateRequest(employeeAssignmentSchema), removeEmployeeManager);

module.exports = router;
