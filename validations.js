const { validationResult } = require('express-validator');
const { failed } = require('./src/helpers/response');

module.exports = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push(err.msg));

    return failed(res, {
      code: 400,
      status: 'failed',
      message: 'validation failed',
      error: extractedErrors,
    });
  } catch (error) {
    failed(res, {
      code: 500,
      status: 'error',
      message: 'internal server error',
      error: error.message,
    });
  }
};
