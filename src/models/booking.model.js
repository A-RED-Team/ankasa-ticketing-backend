const db = require('../config/pg');

const bookingModel = {
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
        `INSERT INTO bookings (id, user_id, flight_id, title, full_name, nationality, travel_insurance, terminal, gate, total_payment, is_active) VALUES ('${id}','${userId}','${flightId}','${title}','${fullName}','${nationallity}','${insurance}','${terminal}','${gate}',${total},1)`,
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
