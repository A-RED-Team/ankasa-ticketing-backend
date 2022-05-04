//import env
const { JWT_SECRET } = require('../helpers/env');

const jwt = require('jsonwebtoken');

const { failed } = require('../helpers/response');

module.exports = (req, res, next) => {
  try {
    const { token } = req.headers;
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded);
    req.APP_DATA = {
      tokenDecoded: decoded,
    };
    next();
  } catch (error) {
    failed(res, error.message, 'failed', 'invalid token');
  }
};
