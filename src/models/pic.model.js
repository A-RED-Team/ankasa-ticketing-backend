const db = require('../config/pg');

const picModel = {
  picNameCheck: (name) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM pic WHERE name='${name}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  picEmailCheck: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM pic WHERE email='${email}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  picPhoneNumberCheck: (phoneNumber) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM pic WHERE phone_number='${phoneNumber}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM pic`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  picAllData: (data) => {
    return new Promise((resolve, reject) => {
      const {
        fieldQuery,
        searchQuery,
        offsetValue,
        limitValue,
        sortQuery,
        modeQuery,
      } = data;
      db.query(
        `SELECT * FROM pic WHERE LOWER(${fieldQuery}) LIKE LOWER ('%${searchQuery}%') ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  picDetailData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM pic WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  picInsertData: (data) => {
    return new Promise((resolve, reject) => {
      const { id, name, email, phoneNumber, isActive } = data;
      db.query(
        `INSERT INTO pic(id,name,email,phone_number,is_active) VALUES('${id}','${name}','${email}','${phoneNumber}',${isActive})`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  picUpdateData: (data) => {
    return new Promise((resolve, reject) => {
      const { id, name, email, phoneNumber, updateAt } = data;
      db.query(
        `UPDATE pic SET name='${name}', email='${email}', phone_number='${phoneNumber}', updated_at='${updateAt}' WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  picModeData: (data) => {
    return new Promise((resolve, reject) => {
      const { id, isActive, deletedAt } = data;
      db.query(
        `UPDATE pic SET is_active=${isActive}, deleted_at='${deletedAt}' WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
            console.log(err);
          }
          resolve(result);
        }
      );
    });
  },
};

module.exports = picModel;
