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
        departureCityQuery,
        arrivalCityQuery,
        typeQuery,
        flightClassQuery,
        departureDateQuery,
        childQuery,
        adultQuery,
        airlinesNameQuery,
        luggageQuery,
        mealQuery,
        wifiQuery,
        directQuery,
        transitQuery,
        moreTransitQuery,
        departureTimeFromQuery,
        departureTimeToQuery,
        arrivedTimeFromQuery,
        arrivedTimeToQuery,
        priceFromQuery,
        priceToQuery,
        fieldQuery,
        searchQuery,
        offsetValue,
        limitValue,
        sortQuery,
        modeQuery,
      } = data;
      db.query(
        `SELECT
        flights.id AS flightId,flights.airline_id,airlines.name AS airlinesName,airlines.image AS airlinesImage,
        departureCity.id AS departureCityId,departureCity.name AS departureCityName,departureCountry.name AS departureCountryName
        ,flights.arrival_city AS arrivalCity,arrivalCity.name AS arrivalCityName,arrivalCountry.name AS arrivalCountryName,
        flights.departure_time,flights.arrival_time,flights.code,
        flights.class,flights.type,to_char(flights.departure_date, 'DD-MM-YYYY') AS departureDate,flights.adult,flights.child,flights.direct,flights.transit,flights.more_transit,flights.luggage,
        flights.meal,flights.wifi,flights.price,flights.stock,flights.rating,flights.total_reviewed,
        flights.id_pic,pic.name AS picName,
        flights.is_active,flights.created_at,
        flights.updated_at,flights.deleted_at
        FROM flights
        INNER JOIN airlines ON flights.airline_id = airlines.id
        INNER JOIN cities AS departureCity on flights.departure_city = departureCity.id
        INNER JOIN countries AS departureCountry on departureCity.country_id = departureCountry.id
        INNER JOIN cities AS arrivalCity on flights.arrival_city = arrivalCity.id
        INNER JOIN countries AS arrivalCountry on arrivalCity.country_id = arrivalCountry.id
        INNER JOIN pic on flights.id_pic = pic.id
        WHERE LOWER (departureCity.name) LIKE LOWER ('%${departureCityQuery}%') 
        AND LOWER(arrivalCity.name) LIKE LOWER ('%${arrivalCityQuery}%')
        AND CAST (flights.type AS VARCHAR(20)) LIKE '%${typeQuery}'
        AND CAST (flights.class AS VARCHAR(20)) LIKE '%${flightClassQuery}'
        AND CAST (flights.departure_date AS VARCHAR) LIKE '%${departureDateQuery}%'
        AND CHILD >= ${childQuery}
        AND ADULT >= ${adultQuery}
        AND LOWER (airlines.name) LIKE LOWER ('%${airlinesNameQuery}%')
        AND CAST (flights.luggage AS VARCHAR) LIKE '%${luggageQuery}'
        AND CAST (flights.meal AS VARCHAR) LIKE '%${mealQuery}'
        AND CAST (flights.wifi AS VARCHAR) LIKE '%${wifiQuery}'
        AND CAST (flights.direct AS VARCHAR) LIKE '%${directQuery}'
        AND CAST (flights.transit AS VARCHAR) LIKE '%${transitQuery}'
        AND CAST (flights.more_transit AS VARCHAR) LIKE '%${moreTransitQuery}'
        AND CAST (flights.departure_time AS TIME) BETWEEN '${departureTimeFromQuery}' AND '${departureTimeToQuery}'
        AND CAST (flights.arrival_time AS TIME) BETWEEN '${arrivedTimeFromQuery}' AND '${arrivedTimeToQuery}'
        AND flights.price BETWEEN ${priceFromQuery} AND ${priceToQuery}
        AND LOWER(${fieldQuery}) LIKE LOWER ('%${searchQuery}%') ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  flightsAllDatatest: (data) => {
    const {
      fieldQuery,
      searchQuery,
      offsetValue,
      limitValue,
      sortQuery,
      modeQuery,
    } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT flights.id AS idFlights,airlines.id,airlines.name,airlines.image AS airlinesImage,departureCity.id,
        departureCity.name AS departureCityName, departureCountry.id,departureCountry.name AS departureCountryName,
        departureCountry.alias AS departureCountryAlias,
        arrivalCity.id AS arrivalCityId, arrivalCity.name as arrivalCityName, 
        arrivalCountry.id AS arrivalCountryId,
        arrivalCountry.name AS arrivalCountryName,arrivalCountry.alias AS arrivalCountryAlias,
        code,flights.class AS flightsClass,flights.type AS flightsType,child,
      adult,transit,direct,more_transit,luggage,meal,wifi,departure_date,
      price,rating,total_reviewed,
      flights.created_at FROM (((((flights INNER JOIN airlines ON flights.airline_id=airlines.id)
      INNER JOIN cities AS departureCity ON flights.departure_city=departureCity.id)
      INNER JOIN countries AS departureCountry ON departureCity.country_id=departureCountry.id)
      INNER JOIN cities AS arrivalCity ON flights.arrival_city=arrivalCity.id)
      INNER JOIN countries AS arrivalCountry ON arrivalCity.country_id=arrivalCountry.id)
      WHERE LOWER(${fieldQuery}) LIKE LOWER ('%${searchQuery}%') ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}
      `,
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log(res);
          // resolve(res);
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
      db.query(
        `SELECT
        flights.id AS flightId,flights.airline_id,airlines.name AS airlinesName,airlines.image AS airlinesImage,
        departureCity.id AS departureCityId,departureCity.name AS departureCityName,departureCountry.name AS departureCountryName
        ,flights.arrival_city AS arrivalCity,arrivalCity.name AS arrivalCityName,arrivalCountry.name AS arrivalCountryName,
        flights.departure_time,flights.arrival_time,flights.code,
        flights.class,flights.type,to_char(flights.departure_date, 'DD-MM-YYYY') AS departureDate,flights.adult,flights.child,flights.direct,flights.transit,flights.more_transit,flights.luggage,
        flights.meal,flights.wifi,flights.price,flights.stock,flights.rating,flights.total_reviewed,
        flights.id_pic,pic.name AS picName,
        flights.is_active,flights.created_at,
        flights.updated_at,flights.deleted_at
        FROM flights
        INNER JOIN airlines ON flights.airline_id = airlines.id
        INNER JOIN cities AS departureCity on flights.departure_city = departureCity.id
        INNER JOIN countries AS departureCountry on departureCity.country_id = departureCountry.id
        INNER JOIN cities AS arrivalCity on flights.arrival_city = arrivalCity.id
        INNER JOIN countries AS arrivalCountry on arrivalCity.country_id = arrivalCountry.id
        INNER JOIN pic on flights.id_pic = pic.id WHERE flights.id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
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
        departureCityQuery,
        arrivalCityQuery,
        typeQuery,
        flightClassQuery,
        departureDateQuery,
        childQuery,
        adultQuery,
        airlinesNameQuery,
        luggageQuery,
        mealQuery,
        wifiQuery,
        directQuery,
        transitQuery,
        moreTransitQuery,
        departureTimeFromQuery,
        departureTimeToQuery,
        arrivedTimeFromQuery,
        arrivedTimeToQuery,
        priceFromQuery,
        priceToQuery,
        fieldQuery,
        searchQuery,
        offsetValue,
        limitValue,
        sortQuery,
        modeQuery,
      } = data;
      db.query(
        `SELECT
        flights.id AS flightId,flights.airline_id,airlines.name AS airlinesName,airlines.image AS airlinesImage,
        departureCity.id AS departureCityId,departureCity.name AS departureCityName,departureCountry.name AS departureCountryName
        ,flights.arrival_city AS arrivalCity,arrivalCity.name AS arrivalCityName,arrivalCountry.name AS arrivalCountryName,
        flights.departure_time,flights.arrival_time,flights.code,
        flights.class,flights.type,to_char(flights.departure_date, 'DD-MM-YYYY') AS departureDate,flights.adult,flights.child,flights.direct,flights.transit,flights.more_transit,flights.luggage,
        flights.meal,flights.wifi,flights.price,flights.stock,flights.rating,flights.total_reviewed,
        flights.id_pic,pic.name AS picName,
        flights.is_active,flights.created_at,
        flights.updated_at,flights.deleted_at
        FROM flights
        INNER JOIN airlines ON flights.airline_id = airlines.id
        INNER JOIN cities AS departureCity on flights.departure_city = departureCity.id
        INNER JOIN countries AS departureCountry on departureCity.country_id = departureCountry.id
        INNER JOIN cities AS arrivalCity on flights.arrival_city = arrivalCity.id
        INNER JOIN countries AS arrivalCountry on arrivalCity.country_id = arrivalCountry.id
        INNER JOIN pic on flights.id_pic = pic.id
        WHERE LOWER (departureCity.name) LIKE LOWER ('%${departureCityQuery}%') 
        AND LOWER(arrivalCity.name) LIKE LOWER ('%${arrivalCityQuery}%')
        AND CAST (flights.type AS VARCHAR(20)) LIKE '%${typeQuery}'
        AND CAST (flights.class AS VARCHAR(20)) LIKE '%${flightClassQuery}'
        AND CAST (flights.departure_date AS VARCHAR) LIKE '%${departureDateQuery}%'
        AND CHILD >= ${childQuery}
        AND ADULT >= ${adultQuery}
        AND LOWER (airlines.name) LIKE LOWER ('%${airlinesNameQuery}%')
        AND CAST (flights.luggage AS VARCHAR) LIKE '%${luggageQuery}'
        AND CAST (flights.meal AS VARCHAR) LIKE '%${mealQuery}'
        AND CAST (flights.wifi AS VARCHAR) LIKE '%${wifiQuery}'
        AND CAST (flights.direct AS VARCHAR) LIKE '%${directQuery}'
        AND CAST (flights.transit AS VARCHAR) LIKE '%${transitQuery}'
        AND CAST (flights.more_transit AS VARCHAR) LIKE '%${moreTransitQuery}'
        AND CAST (flights.departure_time AS TIME) BETWEEN '${departureTimeFromQuery}' AND '${departureTimeToQuery}'
        AND CAST (flights.arrival_time AS TIME) BETWEEN '${arrivedTimeFromQuery}' AND '${arrivedTimeToQuery}'
        AND flights.price BETWEEN ${priceFromQuery} AND ${priceToQuery}
        AND flights.is_active = 1
        AND LOWER(${fieldQuery}) LIKE LOWER ('%${searchQuery}%') ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`,
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
