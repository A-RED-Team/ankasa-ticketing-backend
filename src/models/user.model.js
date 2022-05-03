const db = require('../config/pg');

const userModel = {
  getCountUsers: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM users`, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
  selectAllUsers: (sortByField, sortByType, getLimit, offset, getSearch) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE username ILIKE '%${getSearch}%' ORDER BY ${sortByField} ${sortByType} LIMIT ${getLimit} OFFSET ${offset}`,
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
  getPhoto: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT photo FROM users WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
  updateProfile: (email, username, phone, city, address, postCode, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET email='${email}', username='${username}', phone_number='${phone}', city='${city}', address='${address}', post_code='${postCode}' WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  updatePhoto: (photo, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET photo='${photo}'  WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  updateIsActive: (active, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET is_active='${active}'  WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = userModel;
