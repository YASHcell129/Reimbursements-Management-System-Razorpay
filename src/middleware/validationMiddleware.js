function validateRequest(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const details = error.details.map((detail) => detail.message);
      return res.status(400).json({ success: false, message: 'Validation failed.', errors: details });
    }
    next();
  };
}

module.exports = { validateRequest };
