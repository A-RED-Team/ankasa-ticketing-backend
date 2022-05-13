const db = require('../config/pg');

const cityModel = {
  getCountCity: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS totalCity FROM cities`, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
  getCountCityActive: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS totalCity FROM cities WHERE is_active=1`,
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
  checkCityId: (cityId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM cities WHERE id='${cityId}'`, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
  checkNameCity: (nameCity) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM cities WHERE name='${nameCity}'`,
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
  getAllCity: (sortByField, sortByType, getLimit, offset, getSearch) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM cities WHERE name ILIKE '%${getSearch}%' ORDER BY ${sortByField} ${sortByType} LIMIT ${getLimit} OFFSET ${offset}`,
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
  cityPublic: (sortByField, sortByType, getLimit, offset, getSearch) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT countries.id AS country_id, countries.name AS country_name, countries.alias,
        cities.id AS city_id, cities.name AS city_name, cities.image
        FROM cities
        INNER JOIN countries ON cities.country_id = countries.id
        WHERE (countries.name ILIKE '%${getSearch}%' OR cities.name ILIKE '%${getSearch}%') AND countries.is_active = 1 AND cities.is_active = 1
        ORDER BY ${sortByField} ${sortByType} LIMIT ${getLimit} OFFSET ${offset}`,
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
  getDetailCity: (cityId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM cities WHERE id='${cityId}'`, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
  insertCity: (cityId, countryId, cityName, image) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO cities (id, country_id, name, image, is_active) VALUES ('${cityId}','${countryId}','${cityName}','${image}', 1)`,
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
  updateCity: (cityId, cityName, image) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE cities SET name='${cityName}', image='${image}', updated_at=NOW() WHERE id='${cityId}'`,
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
  cityNonActive: (cityId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE cities SET is_active=0, deleted_at=CURRENT_TIMESTAMP WHERE id='${cityId}'`,
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
  cityActive: (cityId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE cities SET is_active=1, updated_at=NOW() WHERE id='${cityId}'`,
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

module.exports = cityModel;
