const db = require('../config/pg');

const bookingModel = {
  // table flight
  getPrice: (flightId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT price FROM flights WHERE id='${flightId}'`,
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
  allBooking: () => {
    return new Promise((resolve, reject) => {
      db.query(``, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
  detailBooking: () => {
    return new Promise((resolve, reject) => {
      db.query(``, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  },
  userBooking: () => {
    return new Promise((resolve, reject) => {
      db.query(``, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
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
