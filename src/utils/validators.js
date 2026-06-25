const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const roleAssignmentSchema = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().valid('RM', 'APE', 'CFO').required()
});

const employeeAssignmentSchema = Joi.object({
  employeeId: Joi.number().integer().positive().required(),
  managerId: Joi.number().integer().positive().required()
});

const reimbursementSchema = Joi.object({
  title: Joi.string().trim().min(3).required(),
  description: Joi.string().trim().min(5).required(),
  amount: Joi.number().positive().required()
});

const reimbursementActionSchema = Joi.object({
  reimbursementId: Joi.number().integer().positive().required(),
  status: Joi.string().valid('APPROVED', 'REJECTED').required(),
  remarks: Joi.string().allow('').optional()
});

module.exports = {
  registerSchema,
  loginSchema,
  roleAssignmentSchema,
  employeeAssignmentSchema,
  reimbursementSchema,
  reimbursementActionSchema
};
