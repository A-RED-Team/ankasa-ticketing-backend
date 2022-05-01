const { success, failed } = require('../helpers/response');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const authModel = require('../models/auth.model');
const { EMAIL_SENDER, APP_NAME, APP_URL } = require('../helpers/env');
const sendEmail = require('../helpers/sendEmail');
const jwtToken = require('../helpers/generateJWTtoken');

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const emailCheck = await authModel.emailCheck(email);
      // for check email
      if (emailCheck.rowCount > 0) {
        const err = {
          message: 'Email is already exist',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      const id = uuidv4();
      const passwordHashed = await bcrypt.hash(password, 10);
      const verifyToken = crypto.randomBytes(64).toString('hex');
      const isVerified = 0;
      const isActive = 0;
      const level = 0;

      const data = {
        id,
        username,
        email,
        passwordHashed,
        verifyToken,
        isVerified,
        isActive,
        level,
      };
      // insert data
      await authModel.registerData(data);
      // console.log('hello');
      // const emailTemplate = {
      //     from: `"${APP_NAME}" <${EMAIL_SENDER}>`,
      //     to: req.body.email.toLowerCase(),
      //     subject: 'Activate Your Account!',
      //     html: emailVerified(`${APP_URL}/auth/verify?token=${verifyToken}`),
      // };
      // console.log(emailTemplate);
      sendEmail.sendConfirmationEmail(email, verifyToken);
      success(res, {
        code: 200,
        status: 'success',
        message: 'create user sucesss, please activate your email',
        data,
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'failed',
        message: error.message,
        error: [],
      });
      // console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const usernameCheck = await authModel.usernameCheck(username);
      // cek apakah sudah register?
      if (usernameCheck.rowCount >= 1) {
        // cek apakah sudah veifikasi email
        if (usernameCheck.rows[0].verify_token === null) {
          // cek apakah akun active?
          if (usernameCheck.rows[0].is_active == 1) {
            bcrypt
              .compare(password, usernameCheck.rows[0].password)
              .then(async (match) => {
                // compare berhasil?
                if (match) {
                  // login sukses dan memberi token
                  const token = await jwtToken(usernameCheck.rows[0]);
                  success(res, {
                    code: 200,
                    status: 'success',
                    message: 'login success',
                    data: {
                      token: token,
                      userData: usernameCheck.rows[0],
                    },
                  });
                } else {
                  // login gagal
                  failed(res, null, 'failed', 'email atau password salah');
                }
              });
          } else {
            const err = {
              message: 'your account is disabled',
            };
            failed(res, {
              code: 500,
              status: 'error',
              message: err.message,
              error: [],
            });
          }
        } else {
          const err = {
            message: 'e-mail is not verified',
          };
          failed(res, {
            code: 500,
            status: 'error',
            message: err.message,
            error: [],
          });
        }
      } else {
        const err = {
          message: 'username not registered',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
    }
  },
  verifyEmail: async (req, res) => {
    const { token } = req.query;
    const verifyTokenCheck = await authModel.verifyTokenCheck(token);
    if (verifyTokenCheck.rowCount > 0) {
      authModel
        .verifyingUser(token)
        .then((res) => {
          success(res, {
            code: 200,
            status: 'success',
            message: 'email is activated',
            data: [],
            paggination: [],
          });
        })
        .catch((err) => {
          console.log(err);
          failed(res, {
            code: 500,
            status: 'error',
            message: err.message,
            error: [],
          });
        });
    } else {
      const err = {
        message: 'verify token is invalid',
      };
      failed(res, {
        code: 500,
        status: 'error',
        message: err.message,
        error: [],
      });
    }
  },
};
