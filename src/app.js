const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { env } = require('./config/env');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const reimbursementRoutes = require('./routes/reimbursementRoutes');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Reimbursements Management System API is running.',
    health: '/health'
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/', authRoutes);
app.use('/rest/onboardings', authRoutes);
app.use('/rest/roles', roleRoutes);
app.use('/rest/employees', employeeRoutes);
app.use('/rest/reimbursements', reimbursementRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = env.PORT;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
