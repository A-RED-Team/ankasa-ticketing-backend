const authModel = require('../models/auth.model')
const { failed } = require('../helpers/response');

module.exports = {
  isVerified: async (req, res, next) => {
    try {
      const emailCheck = await authModel.emailCheck(req.body.email);
      if (emailCheck.rowCount > 0) {
        next();
      } else if (emailCheck.rows[0].is_verified) {
        next();
      } else {
        failed(res, {
        code: 400,
        status: 'failed',
        message: 'email not verified yet',
        error: err,
      });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'failed',
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },
  isAdmin: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 1) {
      next();
    } else {
      failed(res, {
        code: 500,
        status: 'failed',
        message: 'user dont have access',
        error: [],
      });
    }
  },
  isCustomers: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 0) {
      next();
    } else {
      failed(res, {
        code: 500,
        status: 'failed',
        message: 'user dont have access',
        error: [],
      });
    }
  },
};
