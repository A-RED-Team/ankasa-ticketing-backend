const db = require('../config/pg');

const airlinesModel = {
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM airlines`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  airlinesAllData: (data) => {
    return new Promise((resolve, reject) => {
      const { searchQuery, offsetValue, limitValue, sortQuery, modeQuery } =
        data;
      db.query(
        `SELECT * FROM airlines WHERE LOWER(name) LIKE LOWER ('%${searchQuery}%') ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  airlinesActiveData: (data) => {
    return new Promise((resolve, reject) => {
      const { searchQuery, offsetValue, limitValue, sortQuery, modeQuery } =
        data;
      db.query(
        `SELECT * FROM airlines WHERE LOWER(name) LIKE LOWER ('%${searchQuery}%') AND is_active=1 ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  airlinesDetailData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM airlines WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  airlinesNameCheck: (name) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM airlines WHERE name='${name}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  airlinesInsertData: (data) => {
    return new Promise((resolve, reject) => {
      const { id, name, image, isActive } = data;
      db.query(
        `INSERT INTO airlines(id,name,image,is_active) VALUES('${id}','${name}','${image}',${isActive})`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  airlinesUpdateData: (data) => {
    return new Promise((resolve, reject) => {
      const { id, name, updateAt, image } = data;
      db.query(
        `UPDATE airlines SET name='${name}', updated_at='${updateAt}', image='${image}' WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  airlinesModeData: (data) => {
    return new Promise((resolve, reject) => {
      const { id, isActive, deletedAt } = data;
      db.query(
        `UPDATE airlines SET is_active=${isActive}, deleted_at='${deletedAt}' WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  airlinesDeleteData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM airlines WHERE id ='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = airlinesModel;
