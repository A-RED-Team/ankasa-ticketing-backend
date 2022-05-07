const { check } = require('express-validator');

const bookingValidation = [
  // title
  check('title', 'Title cannot be empty').not().isEmpty(),
  check('title', 'Title require 2 or more characters').isLength({
    min: 2,
    max: 20,
  }),

  // fullName
  check('fullName', 'Full Name cannot be empty').not().isEmpty(),
  check('fullName', 'Full Name require 2 or more characters').isLength({
    min: 2,
  }),

  // nationallity
  check('nationallity', 'Nationallity cannot be empty').not().isEmpty(),
  check('nationallity', 'Nationallity require 4 or more characters').isLength({
    min: 4,
  }),

  // travelInsurance
  check('travelInsurance', 'Travel Insurance cannot be empty').not().isEmpty(),
  check('travelInsurance', 'Travel Insurance require 1 characters').isLength({
    min: 1,
    max: 10,
  }),

  // flightId
  check('flightId', 'Flight Id cannot be empty').not().isEmpty(),
];

const bookingIsActive = [
  // is active
  check('isActive', 'isActive cannot be empty').not().isEmpty(),
  check('isActive', 'isActive only number 0 or 1').isNumeric(),
  check('isActive', 'isActive require 1 characters').isLength({
    min: 1,
  }),
];

module.exports = { bookingValidation, bookingIsActive };
