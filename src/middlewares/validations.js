const { validationResult } = require('express-validator');
const { failed } = require('../helpers/response');

module.exports = (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // if (errors.isEmpty()) {
    //   return next();
    // }
    // const extractedErrors = [];
    // errors.array().map((err) => extractedErrors.push(err.msg));

    // return failed(res, {
    //   code: 400,
    //   status: 'failed',
    //   message: 'validation failed',
    //   error: extractedErrors,
    // });
    const errors = validationResult(req).array({ onlyFirstError: true });

    if (errors.length) {
      failed(res, {
        code: 400,
        status: errors,
        message: 'Validation Failed',
      });
      return;
    }
    console.log('validatons');
    next();
  } catch (error) {
    failed(res, {
      code: 500,
      status: 'error',
      message: 'internal server error',
      error: error.message,
    });
  }
};
