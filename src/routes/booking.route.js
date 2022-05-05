const express = require('express');
const { insertBooking } = require('../controllers/booking.controller');
const jwtAuth = require('../middlewares/jwtAuth');
const { isAdmin, isCustomers } = require('../middlewares/authorization');

const router = express.Router();

router.post('/insert-booking', jwtAuth, isCustomers, insertBooking);

module.exports = router;
