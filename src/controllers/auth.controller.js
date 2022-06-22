const { success, failed } = require('../helpers/response');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const authModel = require('../models/auth.model');
const { APP_CLIENT } = require('../helpers/env');
const sendEmail = require('../helpers/sendEmail');
const sendPassword = require('../helpers/sendPassword');
const jwtToken = require('../helpers/generateJWTtoken');

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const usernameCheck = await authModel.usernameCheck(username);
      if (usernameCheck.rowCount > 0) {
        const err = {
          message: 'Username is already exist',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

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
      const photo = 'profile-default.png';

      const data = {
        id,
        username,
        email,
        passwordHashed,
        verifyToken,
        isVerified,
        isActive,
        level,
        photo,
      };
      // insert data
      const out = await authModel.registerData(data);
      sendEmail.sendConfirmationEmail(email, verifyToken, username);
      success(res, {
        code: 200,
        status: 'success',
        message: 'create user sucesss, please activate your email',
        data: data,
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'failed',
        message: error.message,
        error: [],
      });
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
                    token: token,
                  });
                } else {
                  // login gagal
                  const err = {
                    message: 'wrong username or password',
                  };
                  failed(res, {
                    code: 500,
                    status: 'error',
                    message: err.message,
                    error: [],
                  });
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
        .then((result) => {
          res.render
          res.render('./welcome.ejs', {
            username: verifyTokenCheck.rows[0].username,
            url_home: `${APP_CLIENT}`,
            url_login: `${APP_CLIENT}/login`,
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
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const emailCheck = await authModel.emailCheck(email);
      if (emailCheck.rowCount > 0) {
      const verifyToken = crypto.randomBytes(64).toString('hex');
        await authModel.updateToken(verifyToken, emailCheck.rows[0].id);
        sendPassword.sendConfirmationEmail(
          email,
          verifyToken,
          emailCheck.rows[0].photo
        );
        success(res, {
          code: 200,
          status: 'success',
          message: 'Password reset has been sent via email',
          data: req.body,
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
  resetPassword: async (req, res) => {
    try {
      const { token } = req.query;
      const verifyTokenCheck = await authModel.verifyTokenCheck(token);
      if (verifyTokenCheck.rowCount > 0) {
        const passwordHashed = await bcrypt.hash(req.body.password, 10);
        await authModel.resetPassword(
          passwordHashed, verifyTokenCheck.rows[0].id
        );
        await authModel.updateToken(null, verifyTokenCheck.rows[0].id);

        success(res, {
          code: 200,
          status: 'failed',
          message: 'Reset Password Sucess',
          data: [],
        });
        // authModelverifyTokenCheck.rows[0].id
        //   .verifyingUser(token)
        //   .then((result) => {
        //     res.render;
        //     res.render('./welcome.ejs', {
        //       user_firstname: 'ta',
        //       confirm_link: 'ta',
        //     });
        //   })
        //   .catch((err) => {
        //     failed(res, {
        //       code: 500,
        //       status: 'error',
        //       message: err.message,
        //       error: [],
        //     });
        //   });
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
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
    }
  }
};
