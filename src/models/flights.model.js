const db = require('../config/pg');

const flightsModel = {
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM flights`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  flightsAllData: (data) => {
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
        `SELECT * FROM flights WHERE LOWER(${fieldQuery}) LIKE LOWER ('%${searchQuery}%') ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  checkAirlinesId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM airlines WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  checkAirlinesId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM airlines WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  checkAirlinesCities: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM cities WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  codeCheckFlight: (code) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM flights WHERE code='${code}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  checkPicId: (idPic) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM pic WHERE id='${idPic}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  flightsCodeCheck: (code) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM flights WHERE code='${code}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  flightsDetailData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM flights WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  flightsInsertData: (data) => {
    return new Promise((resolve, reject) => {
      const {
        id,
        airlineId,
        departureCity,
        arrivalCity,
        departureTime,
        arrivalTime,
        code,
        classs,
        type,
        departureDate,
        adult,
        child,
        direct,
        transit,
        moreTransit,
        luggage,
        meal,
        wifi,
        price,
        stock,
        rating,
        totalReviewed,
        idPic,
        isActive,
      } = data;
      db.query(
        `INSERT INTO flights(id,airline_id,departure_city,arrival_city,departure_time,arrival_time,code,class,type,departure_date,adult,child,
        direct,transit,more_transit,luggage,meal,wifi,price,stock,rating,total_reviewed,id_pic,is_active) VALUES('${id}','${airlineId}','${departureCity}','${arrivalCity}','${departureTime}','${arrivalTime}','${code}','${classs}',${type},'${departureDate}',${adult},${child},${direct},${transit},${moreTransit},${luggage},${meal},${wifi},${price},${stock},${rating},${totalReviewed},'${idPic}',${isActive})`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  flightsUpdateData: (data) => {
    return new Promise((resolve, reject) => {
      const {
        id,
        airlineId,
        departureCity,
        arrivalCity,
        departureTime,
        arrivalTime,
        code,
        classs,
        type,
        departureDate,
        adult,
        child,
        direct,
        transit,
        moreTransit,
        luggage,
        meal,
        wifi,
        price,
        stock,
        idPic,
        updateAt,
      } = data;

      db.query(
        `UPDATE flights SET airline_id='${airlineId}', departure_city='${departureCity}', arrival_city='${arrivalCity}', departure_time='${departureTime}', arrival_time='${arrivalTime}', code='${code}', class=${classs}, type=${type}, departure_date='${departureDate}', adult=${adult}, child=${child}, direct=${direct}, transit=${transit}, more_transit=${moreTransit}, luggage=${luggage}, meal=${meal}, wifi=${wifi}, price=${price}, stock=${stock}, id_pic='${idPic}', updated_at='${updateAt}' where id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  flightsModeData: (data) => {
    return new Promise((resolve, reject) => {
      const { id, isActive, deletedAt } = data;
      db.query(
        `UPDATE flights SET is_active=${isActive}, deleted_at='${deletedAt}' WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  flightsDeleteData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM flights WHERE id ='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  flightsActiveData: (data) => {
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
        `SELECT * FROM flights WHERE is_active=1 AND LOWER(${fieldQuery}) LIKE LOWER ('%${searchQuery}%') ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`,
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

module.exports = flightsModel;
