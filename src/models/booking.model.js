const db = require('../config/pg');

const bookingModel = {
  // table flight
  getFlight: (flightId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM flights WHERE id='${flightId}'`,
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
  setStock: (flightId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE flights SET stock=stock-1 WHERE id='${flightId}'`,
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

  // table booking
  getCountBooking: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS totalBooking FROM bookings`,
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
  insertBooking: (
    id,
    userId,
    flightId,
    title,
    fullName,
    nationallity,
    insurance,
    terminal,
    gate,
    total
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active, payment_status) VALUES ('${id}','${userId}','${flightId}','${title}','${fullName}','${nationallity}','${insurance}','${terminal}','${gate}',${total},1,0)`,
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
  allBooking: (sortByField, sortByType, getLimit, offset, getSearch) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT users.id AS users_id, users.username, users.email, users.city AS users_city, users.address,
      bookings.id AS booking_id, bookings.full_name AS name_booking, flights.departure_date, flights.departure_time, airlines.name AS airline_name,
      country1.alias AS from_contry, country2.alias AS to_contry, bookings.terminal, bookings.gate,
      flights.class, bookings.payment_status
      FROM flights
      INNER JOIN bookings ON flights.id = bookings.flight_id
      INNER JOIN cities AS city1 ON city1.id = flights.departure_city
      INNER JOIN cities AS city2 ON city2.id = flights.arrival_city
      INNER JOIN countries AS country1 ON country1.id = city1.country_id
      INNER JOIN countries AS country2 ON country2.id = city2.country_id
      INNER JOIN airlines ON flights.airline_id = airlines.id
      INNER JOIN users ON users.id = bookings.user_id
      WHERE (users.username ILIKE '%${getSearch}%' OR bookings.full_name ILIKE '%${getSearch}%')
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
  detailBooking: (bookingId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT flights.departure_date, flights.departure_time, airlines.name AS airline_name, country1.alias AS from_contry, country2.alias AS to_contry, bookings.terminal, bookings.gate, flights.class, bookings.payment_status FROM flights INNER JOIN bookings ON flights.id = bookings.flight_id INNER JOIN cities AS city1 ON city1.id = flights.departure_city INNER JOIN cities AS city2 ON city2.id = flights.arrival_city INNER JOIN countries AS country1 ON country1.id = city1.country_id INNER JOIN countries AS country2 ON country2.id = city2.country_id INNER JOIN airlines ON flights.airline_id = airlines.id WHERE bookings.id='${bookingId}'`,
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
  listUserBooking: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT bookings.id AS booking_id, flights.departure_date, flights.departure_time, airlines.name AS airline_name, country1.alias AS from_contry, country2.alias AS to_contry, bookings.terminal, bookings.gate, flights.class, bookings.payment_status FROM flights INNER JOIN bookings ON flights.id = bookings.flight_id INNER JOIN cities AS city1 ON city1.id = flights.departure_city INNER JOIN cities AS city2 ON city2.id = flights.arrival_city INNER JOIN countries AS country1 ON country1.id = city1.country_id INNER JOIN countries AS country2 ON country2.id = city2.country_id INNER JOIN airlines ON flights.airline_id = airlines.id WHERE bookings.user_id='${userId}'`,
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
  updateBooking: (bookingId, userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE bookings SET payment_status=1, updated_at=NOW() WHERE id='${bookingId}' AND user_id='${userId}'`,
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
  bookingNonActive: (isActive, bookingId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE bookings SET is_active=${isActive}, deleted_at=NOW() WHERE id='${bookingId}'`,
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
  bookingActive: (isActive, bookingId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE bookings SET is_active=${isActive}, updated_at=NOW() WHERE id='${bookingId}'`,
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

module.exports = bookingModel;
