const express = require('express');
const {
  insertBooking,
  allBooking,
  detailBooking,
  detailBookingUser,
  listUserBooking,
  updateBookingPayment,
  deleteBooking,
  bookingCanceled,
} = require('../controllers/booking.controller');
const jwtAuth = require('../middlewares/jwtAuth');
const { isAdmin, isCustomers } = require('../middlewares/authorization');
const {
  bookingValidation,
  bookingIsActive,
} = require('../validations/booking.validation');
const validation = require('../middlewares/validation');

const router = express.Router();

router
  .post(
    '/booking',
    jwtAuth,
    isCustomers,
    bookingValidation,
    validation,
    insertBooking
  )
  .get('/booking', jwtAuth, isAdmin, allBooking)
  .get('/mybooking', jwtAuth, isCustomers, listUserBooking)
  .get('/booking/:bookingId', jwtAuth, isAdmin, detailBooking)
  .get('/booking/byuser/:bookingId', jwtAuth, isCustomers, detailBookingUser)
  .put(
    '/booking/payment/:bookingId',
    jwtAuth,
    isCustomers,
    updateBookingPayment
  )
  .put(
    '/booking/status/:bookingId',
    jwtAuth,
    isAdmin,
    bookingIsActive,
    validation,
    deleteBooking
  )
  .put('/booking/canceled/:bookingId', jwtAuth, isCustomers, bookingCanceled);

module.exports = router;
