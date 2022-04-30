const { success, failed } = require('../helpers/response');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const authModel = require('../models/auth.model');
const { EMAIL_SENDER, APP_NAME, APP_URL } = require('../helpers/env');
const emailVerified = require('../utils/email/emailVerified');
const sendEmail = require('../utils/email/sendEmail');

module.exports = {
  register: async (req, res) => {
    try {
      console.log('hi');
      const { username, email, password } = req.body;
      const emailCheck = await authModel.emailCheck(email);
      // for check email
      // if (emailCheck.rowCount > 0) {
      //   const err = {
      //     message: 'Email is already exist',
      //   };
      //   failed(res, {
      //     code: 500,
      //     status: error,
      //     message: err.message,
      //     error: [],
      //   });
      //   return;
      // }
      const id = uuidv4();
      console.log(id);
      const passwordHashed = await bcrypt.hash(password, 10);
      console.log(passwordHashed);
      const verifyToken = crypto.randomBytes(64).toString('hex');
      console.log(verifyToken);
      const isVerified = 0;
      console.log(isVerified);
      const isActive = 0;

      console.log(isActive);
      // insert data
      await authModel.registerData(
        id,
        username,
        email,
        passwordHashed,
        verifyToken,
        isVerified,
        isActive
      );
      // console.log('hello');
      const emailTemplate = {
        from: `"${APP_NAME}" <${EMAIL_SENDER}>`,
        to: req.body.email.toLowerCase(),
        subject: 'Activate Your Account!',
        html: emailVerified(`${APP_URL}/auth/verify?token=${verifyToken}`),
      };
      success(res, {
        code: 200,
        status: success,
        message: 'create user sucesss, please activate your email',
        data: [],
        paggination: [],
      });
      // console.log(emailTemplate);
      sendEmail(emailTemplate);
    } catch (error) {
      failed(res, {
        code: 500,
        status: error,
        message: error.message,
        error: [],
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
    } catch (error) {}
  },
};
