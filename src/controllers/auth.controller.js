const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const { success, failed } = require('../helpers/response');
const jwtToken = require('../utils/generateJwtToken');
const authModel = require('../models/auth.model');
const sendEmail = require('../utils/sendEmail');
const { APP_NAME, EMAIL_FROM, API_URL, APP_CLIENT } = require('../helpers/env');
const activateAccount = require('../templates/confirm-email');
const resetAccount = require('../templates/reset-password');

module.exports = {
  register: async (req, res) => {
    try {
      const { name, username, email, password } = req.body;
      const checkUsername = await authModel.findBy('username', username);
      if (checkUsername.rowCount) {
        return failed(res, {
          code: 409,
          message: 'Username already exist',
          error: 'Conflict',
        });
      }

      const checkEmail = await authModel.findBy('email', email);
      // for check email
      if (checkEmail.rowCount) {
        return failed(res, {
          code: 409,
          message: 'Email already exist',
          error: 'Conflict',
        });
      }

      const verifyToken = crypto.randomBytes(64).toString('hex');
      const data = {
        id: uuidv4(),
        name,
        username,
        email,
        password: await bcrypt.hash(password, 10),
        verifyToken,
      };

      // send email
      const templateEmail = {
        from: `"${APP_NAME}" <${EMAIL_FROM}>`,
        to: email.toLowerCase(),
        subject: 'Activate Your Account!',
        html: activateAccount(`${API_URL}auth/activation/${verifyToken}`, name),
      };
      sendEmail(templateEmail);

      // insert data
      const result = await authModel.register(data);

      success(res, {
        code: 200,
        message: 'Success Registered, please verification your email',
        data: result,
      });
    } catch (error) {
      failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const { token } = req.params;
      const checkToken = await authModel.findBy('verify_token', token);
      if (checkToken.rowCount) {
        if (!checkToken.rowCount) {
          res.send(`
          <div>
            <h1>Activation Failed</h1>
            <h3>Token invalid</h3>
          </div>`);
          return;
        }

        await authModel.activateEmail(token);

        res.render('./welcome.ejs', {
          email: checkToken.rows[0].username,
          url_home: `${APP_CLIENT}`,
          url_login: `${APP_CLIENT}login`,
        });
      } else {
        failed(res, {
          code: 404,
          message: 'Token not found',
          error: 'Not Found',
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await authModel.findBy('username', username);
      // cek apakah sudah register?
      if (user.rowCount > 0) {
        // cek apakah akun active?
        if (user.rows[0].is_active) {
          const match = await bcrypt.compare(password, user.rows[0].password);

          if (match) {
            const jwt = jwtToken(user.rows[0]);

            return success(res, {
              code: 200,
              message: 'Login sucess',
              token: jwt,
            });
          } else {
            return failed(res, {
              code: 401,
              message: 'Wrong username or password',
              error: 'Unauthorized',
            });
          }
        } else {
          return failed(res, {
            code: 403,
            message: 'Your account has been banned',
            error: 'Forbidden',
          });
        }
      } else {
        return failed(res, {
          code: 401,
          message: 'Wrong username or password',
          error: 'Unauthorized',
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await authModel.findBy('email', email);

      if (user.rowCount) {
        const verifyToken = crypto.randomBytes(30).toString('hex');

        // send email for reset password
        const templateEmail = {
          from: `"${APP_NAME}" <${EMAIL_FROM}>`,
          to: email.toLowerCase(),
          subject: 'Reset Your Password!',
          html: resetAccount(`${APP_CLIENT}reset/${verifyToken}`),
        };
        sendEmail(templateEmail);

        const result = await authModel.updateToken(
          verifyToken,
          user.rows[0].id
        );

        success(res, {
          code: 200,
          message: 'Password reset has been sent via email',
          data: result,
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const user = await authModel.findBy('verify_token', token);

      if (!user.rowCount) {
        return failed(res, {
          code: 401,
          message: 'Invalid token',
          error: 'Unauthorized',
        });
      }

      const password = await bcrypt.hash(req.body.password, 10);
      const result = await authModel.updatePassword(password, user.rows[0].id);

      return success(res, {
        code: 200,
        message: 'Reset Password Success',
        data: result,
      });
    } catch (error) {
      failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
};
