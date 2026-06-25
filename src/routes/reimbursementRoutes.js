const express = require('express');
const { create, list, listByUser, update } = require('../controllers/reimbursementController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validationMiddleware');
const { reimbursementSchema, reimbursementActionSchema } = require('../utils/validators');

const router = express.Router();

router.post('/', authenticate, authorize('EMP', 'RM', 'APE', 'CFO'), validateRequest(reimbursementSchema), create);
router.patch('/', authenticate, authorize('RM', 'APE'), validateRequest(reimbursementActionSchema), update);
router.get('/', authenticate, authorize('CFO', 'RM', 'APE'), list);
router.get('/:userId', authenticate, authorize('CFO', 'RM', 'APE'), listByUser);

module.exports = router;
