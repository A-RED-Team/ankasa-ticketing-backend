const db = require('../config/pg');

const authModel = {
  loginData: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT password,is_active FROM users WHERE email='${email}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  registerData: (
    id,
    username,
    email,
    passwordHashed,
    verifyToken,
    isVerified,
    isActive,
    level
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users(id,username,email,password,verify_token,is_verfied,is_active,level)
        VALUES('${id}','${username}','${email}','${passwordHashed}','${verifyToken}','${isVerified}',${isActive},${level})`,
        (err, result) => {
          if (err) {
            // console.log(err);
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  emailCheck: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  usernameCheck: (username) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE username='${username}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  verifyTokenCheck: (verifyToken) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE verify_token='${verifyToken}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  verifyingUser: (verifyToken) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET is_verfied=1, is_active=1, verify_token=null WHERE verify_token='${verifyToken}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
};
module.exports = authModel;
