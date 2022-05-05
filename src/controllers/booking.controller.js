const bookingModel = require('../models/booking.model');
const { success, failed } = require('../helpers/response');
const { v4: uuidv4 } = require('uuid');

const bookingController = {
  insertBooking: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id;
      const id = uuidv4();
      const {
        flightId,
        title,
        fullName,
        nationallity,
        insurance,
        terminal,
        gate,
        total,
      } = req.body;
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Insert booking failed',
        error: err.message,
      });
    }
  },
};

module.exports = bookingController;
