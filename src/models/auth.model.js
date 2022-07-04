const db = require('../config/pg');

const authModel = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      const { id, name, username, email, password, verifyToken } = data;
      db.query(
        `INSERT INTO users 
        (id, name, username, email, password, verify_token, is_verified, is_active, level, photo)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [id, name, username, email, password, verifyToken, 0, 0, 0, null],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    });
  },
  findBy: (field, data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE ${field}=$1`,
        [data],
        (err, result) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(result);
        }
      );
    });
  },
  activateEmail: (verifyToken) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET verify_token = null, is_verified = 1, is_active = 1 WHERE verify_token = $1`,
        [verifyToken],
        (err, result) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(result);
        }
      );
    });
  },
  updateToken: (verifyToken, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET verify_token=$1 WHERE id=$2`,
        [verifyToken, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve({
            verifyToken,
            id,
          });
        }
      );
    });
  },
  updatePassword: (password, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET password=$1, verify_token = null WHERE id=$2`,
        [password, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve({
            password,
            id,
          });
        }
      );
    });
  },
};
module.exports = authModel;
