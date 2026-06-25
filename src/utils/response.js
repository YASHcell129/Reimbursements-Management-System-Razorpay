function successResponse(res, statusCode, data, message) {
  return res.status(statusCode).json({ success: true, data, message });
}

function errorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ success: false, message });
}

module.exports = { successResponse, errorResponse };
