const express = require('express');
const {
  insertBooking,
  allBooking,
  detailBooking,
  detailBookingUser,
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
    '/insert-booking',
    jwtAuth,
    isCustomers,
    bookingValidation,
    validation,
    insertBooking
  )
  .get('/get-all-booking', jwtAuth, isAdmin, allBooking)
  .get('/mybooking-user', jwtAuth, isCustomers, listUserBooking)
  .get('/detail-booking/:bookingId', jwtAuth, isAdmin, detailBooking)
  .get(
    '/detail-booking-byuser/:bookingId',
    jwtAuth,
    isCustomers,
    detailBookingUser
  )
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
