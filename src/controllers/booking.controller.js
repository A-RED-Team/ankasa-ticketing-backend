const bookingModel = require('../models/booking.model');
const { success, failed } = require('../helpers/response');
const { v4: uuidv4 } = require('uuid');

const bookingController = {
  insertBooking: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id;
      const id = uuidv4();
      const flightId = req.params.flightId;
      const { title, fullName, nationallity, travelInsurance, terminal, gate } =
        req.body;
      const total = await bookingModel.getPrice(flightId);
      if (total.rowCount === 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: 'Flight Id not found',
          error: null,
        });
        return;
      }
      let getTotal = '';
      if (travelInsurance == '0') {
        getTotal = total.rows[0].price;
      } else {
        const asuransi = 2;
        getTotal = total.rows[0].price + asuransi;
      }
      const result = await bookingModel.insertBooking(
        id,
        userId,
        flightId,
        title,
        fullName,
        nationallity,
        travelInsurance,
        terminal,
        gate,
        getTotal
      );
      success(res, {
        code: 200,
        status: 'Success',
        message: 'Insert booking success',
        data: result,
      });
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Insert booking failed',
        error: err.message,
      });
    }
  },
  allBooking: async (req, res) => {
    try {
      //
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Get all booking failed',
        error: err.message,
      });
    }
  },
  detailBooking: async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Get detai booking failed',
        error: err.message,
      });
    }
  },
  userBooking: async (req, res) => {
    try {
      const userId = req.params.userId;
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Get user booking failed',
        error: err.message,
      });
    }
  },
  updateBooking: async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      const userId = req.APP_DATA.tokenDecoded.id;
      const result = await bookingModel.updateBooking(bookingId, userId);
      if (result.rowCount === 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: 'Booking Id not found',
          error: null,
        });
        return;
      }
      success(res, {
        code: 200,
        status: 'Success',
        message: 'Update booking payment success',
        data: result,
      });
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Update booking failed',
        error: err.message,
      });
    }
  },
  deleteBooking: async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      const { isActive } = req.body;
      if (isActive === '0') {
        const result = await bookingModel.bookingNonActive(isActive, bookingId);
        if (result.rowCount === 0) {
          failed(res, {
            code: 400,
            status: 'Error',
            message: 'Booking Id not found',
            error: null,
          });
          return;
        }
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Delete booking success',
          data: result,
        });
      } else {
        const result = await bookingModel.bookingActive(isActive, bookingId);
        if (result.rowCount === 0) {
          failed(res, {
            code: 400,
            status: 'Error',
            message: 'Booking Id not found',
            error: null,
          });
          return;
        }
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Booking active success',
          data: result,
        });
      }
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Delete booking failed',
        error: err.message,
      });
    }
  },
};

module.exports = bookingController;
