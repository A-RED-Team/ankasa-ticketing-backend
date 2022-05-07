const express = require('express');
const {
  insertBooking,
  allBooking,
  detailBooking,
  listUserBooking,
  updateBooking,
  deleteBooking,
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
    '/insert-booking/:flightId',
    jwtAuth,
    isCustomers,
    bookingValidation,
    validation,
    insertBooking
  )
  .get('/get-all-booking', jwtAuth, isAdmin, allBooking)
  .get('/detail-booking/:bookingId', jwtAuth, detailBooking)
  .get('/detail-booking-user', jwtAuth, isCustomers, listUserBooking)
  .put(
    '/update-booking-payment/:bookingId',
    jwtAuth,
    isCustomers,
    updateBooking
  )
  .put(
    '/delete-booking/:bookingId',
    jwtAuth,
    isAdmin,
    bookingIsActive,
    validation,
    deleteBooking
  );

module.exports = router;
