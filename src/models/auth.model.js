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
    isActive
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users(id,username,email,password,verify_token,is_verfied,is_active)
        VALUES('${id}','${username}','${email}','${passwordHashed}','${verifyToken}','${isVerified}',${isActive})`,
        // `INSERT INTO users(id,username,email,password,verify_token,is_verfied,is_active) VALUES('${id}','${username}','${email}','${passwordHashed}','${verifyToken}',${isVerified},${isActive})`,
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
};
module.exports = authModel;
