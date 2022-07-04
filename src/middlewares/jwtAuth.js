const jwt = require('jsonwebtoken');
const { failed } = require('../helpers/response');
const { JWT_SECRET } = require('../helpers/env');

module.exports = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return failed(res, {
        code: 403,
        message: 'Please login first',
        error: 'Forbidden',
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.APP_DATA = { tokenDecoded: decoded };
    next();
  } catch (err) {
    failed(res, {
      code: 401,
      message: 'Invalid token',
      error: 'Unauthorized',
    });
  }
};
