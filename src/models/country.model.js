const db = require('../config/pg');

const countryModel = {
  getCountCountry: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS totalCountry FROM countries`,
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
  getCountry: (countryId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM countries WHERE id='${countryId}'`,
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
  checkNameCountry: (countryName) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM countries WHERE name='${countryName}'`,
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
  checkAliasCountry: (countryAlias) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM countries WHERE alias='${countryAlias}'`,
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
  getAllCountry: (sortByField, sortByType, getLimit, offset, getSearch) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM countries WHERE name ILIKE '%${getSearch}%' ORDER BY ${sortByField} ${sortByType} LIMIT ${getLimit} OFFSET ${offset}`,
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
  getAllCountryPublic: (
    sortByField,
    sortByType,
    getLimit,
    offset,
    getSearch
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM countries WHERE (name ILIKE '%${getSearch}%') AND is_active=1 ORDER BY ${sortByField} ${sortByType} LIMIT ${getLimit} OFFSET ${offset}`,
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
  getDetailCountry: (countryId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM countries WHERE id='${countryId}'`,
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
  insertCountry: (id, nameCountry, aliasCountry) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO countries (id, name, alias, is_active )VALUES ('${id}', '${nameCountry}', '${aliasCountry}', 1)`,
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
  updateCountry: (id, nameCountry, aliasCountry) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE countries SET name='${nameCountry}', alias='${aliasCountry}', updated_at=NOW() WHERE id='${id}'`,
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
  countryNonActive: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE countries SET is_active=0, deleted_at=NOW() WHERE id='${id}'`,
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
  countryActive: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE countries SET is_active=1, updated_at=NOW() WHERE id='${id}'`,
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
};

module.exports = countryModel;
