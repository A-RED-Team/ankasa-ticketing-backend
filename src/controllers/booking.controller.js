const bookingModel = require('../models/booking.model');
const { success, failed } = require('../helpers/response');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');

const bookingController = {
  insertBooking: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id;
      const id = uuidv4();
      const { title, fullName, nationallity, travelInsurance, flightId } =
        req.body;
      const getFlight = await bookingModel.getFlight(flightId);
      if (getFlight.rowCount === 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: `Flight with Id ${flightId} not found`,
          error: null,
        });
        return;
      }
      const getCode = getFlight.rows[0].code;
      let terminal;
      let gate;
      if (getCode.length == 7) {
        terminal = getCode.substring(0, 3);
        gate = getCode.substring(4, 7);
      } else {
        terminal = getCode.substring(0, 2);
        gate = getCode.substring(3, 6);
      }
      if (getFlight.rows[0].stock <= 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: 'Ticket stock is out',
          error: null,
        });
        return;
      } else {
        let getTotal = '';
        if (travelInsurance == '0') {
          getTotal = getFlight.rows[0].price;
        } else {
          const asuransi = 2;
          getTotal = getFlight.rows[0].price + asuransi;
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

        const newData = {
          id,
          userId,
          flightId,
          title,
          fullName,
          nationallity,
          travelInsurance,
          terminal,
          gate,
          getTotal,
        };

        QRCode.toFile(
          `public/qrcode/${id}.png`,
          id,
          {
            color: {
              dark: '#000',
              light: '#ffff',
            },
          },
          function (err) {
            if (err) throw err;
          }
        );

        success(res, {
          code: 200,
          status: 'Success',
          message: 'Insert booking success',
          data: newData,
        });
        const setStock = await bookingModel.setStock(flightId);
      }
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
      let { sortField, sortType, page, limit, search } = req.query;
      page = Number(page);
      limit = Number(limit);
      const getSearch = !search ? '' : search;
      const sortByField = !sortField ? 'bookings.full_name' : sortField;
      const sortByType =
        sortType === 'ASC' || sortType === 'DESC' ? sortType : 'ASC';
      const getPage = !page ? 1 : page;
      const getLimit = !limit ? 10 : limit;
      const offset = (getPage - 1) * getLimit;
      const allData = await bookingModel.getCountBooking();
      const totalData = Number(allData.rows[0].totalbooking);
      const result = await bookingModel.allBooking(
        sortByField,
        sortByType,
        getLimit,
        offset,
        getSearch
      );
      if (result.rowCount === 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: 'Data not found',
          error: null,
        });
        return;
      }
      if (search) {
        const pagination = {
          currentPage: getPage,
          currentLimit: getLimit,
          totalPage: Math.ceil(result.rowCount / getLimit),
        };
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Get all booking success',
          data: result.rows,
          pagination,
        });
      } else {
        const pagination = {
          currentPage: getPage,
          currentLimit: getLimit,
          totalPage: Math.ceil(totalData / getLimit),
        };
        success(res, {
          code: 201,
          status: 'Success',
          message: 'Get all booking success',
          data: result.rows,
          pagination,
        });
      }
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
      const result = await bookingModel.detailBooking(bookingId);
      if (result.rowCount === 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: `Booking with Id ${bookingId} not found`,
          error: null,
        });
        return;
      }
      success(res, {
        code: 200,
        status: 'Success',
        message: 'Get detail booking success',
        data: result.rows[0],
      });
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Get detail booking failed',
        error: err.message,
      });
    }
  },
  detailBookingUser: async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      const result = await bookingModel.detailBookingUser(bookingId);
      if (result.rowCount === 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: `Booking with Id ${bookingId} not found`,
          error: null,
        });
        return;
      }
      success(res, {
        code: 200,
        status: 'Success',
        message: 'Get detail booking success',
        data: result.rows[0],
      });
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Get detail booking failed',
        error: err.message,
      });
    }
  },
  listUserBooking: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id;
      let { page, limit } = req.query;
      page = Number(page);
      limit = Number(limit);
      const getPage = !page ? 1 : page;
      const getLimit = !limit ? 10 : limit;
      const offset = (getPage - 1) * getLimit;
      const allData = await bookingModel.getCountBookingById(userId);
      const totalData = Number(allData.rows[0].totalbooking);
      const pagination = {
        currentPage: getPage,
        currentLimit: getLimit,
        totalPage: Math.ceil(totalData / getLimit),
      };
      const result = await bookingModel.listUserBooking(
        userId,
        getLimit,
        offset
      );
      if (result.rowCount === 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: `Booking with Id ${userId} not found`,
          error: null,
        });
        return;
      }
      success(res, {
        code: 200,
        status: 'Success',
        message: 'Get list booking by user success',
        data: result.rows,
        pagination,
      });
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Get detail user booking failed',
        error: err.message,
      });
    }
  },
  updateBooking: async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      const userId = req.APP_DATA.tokenDecoded.id;
      const checkPayment = await bookingModel.bookingDetaiId(bookingId);
      if (checkPayment.rows[0].payment_status == 1) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: `Ticket with id booking ${bookingId} have been paid off`,
          error: null,
        });
        return;
      }
      const result = await bookingModel.updateBooking(bookingId, userId);
      if (result.rowCount === 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: `Booking with Id ${bookingId} not found`,
          error: null,
        });
        return;
      }
      success(res, {
        code: 200,
        status: 'Success',
        message: 'Update booking payment success',
        data: [],
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
      const checkIsActive = await bookingModel.bookingDetaiId(bookingId);
      if (checkIsActive.rowCount === 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: `Booking with Id ${bookingId} not found`,
          error: null,
        });
        return;
      }
      if (checkIsActive.rows[0].is_active == isActive) {
        if (isActive == '1') {
          failed(res, {
            code: 400,
            status: 'Error',
            message: `Booking with id ${bookingId} have been active`,
            error: null,
          });
        } else {
          failed(res, {
            code: 400,
            status: 'Error',
            message: `Booking with id ${bookingId} have been non active`,
            error: null,
          });
        }
        return;
      }
      if (isActive === '0') {
        const result = await bookingModel.bookingNonActive(bookingId);
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Delete booking success',
          data: req.body,
        });
      } else {
        const result = await bookingModel.bookingActive(bookingId);
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Booking active success',
          data: req.body,
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
