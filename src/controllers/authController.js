const { registerUser, loginUser } = require('../services/authService');

async function register(req, res, next) {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await loginUser(req.body);
    res.cookie('auth', result.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    res.status(200).json({ success: true, data: result.user });
  } catch (error) {
    next(error);
  }
}

async function logout(_req, res) {
  res.clearCookie('auth');
  res.status(200).json({ success: true, message: 'Logged out.' });
}

module.exports = { register, login, logout };
