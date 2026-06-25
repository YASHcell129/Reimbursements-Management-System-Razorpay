const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const { validateRequest } = require('../middleware/validationMiddleware');
const { registerSchema, loginSchema } = require('../utils/validators');

const router = express.Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.post('/logout', logout);

module.exports = router;
