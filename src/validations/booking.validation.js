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

  // payment
  check('payment', 'payment cannot be empty').not().isEmpty(),
  check('payment', 'payment only number 0 or 1').isNumeric(),
  check('payment', 'payment require 1 characters').isLength({
    min: 1,
  }),

  // adult
  check('adult', 'adult cannot be empty').not().isEmpty(),
  check('adult', 'adult only number').isNumeric(),
  check('adult', 'adult require 1 characters').isLength({
    min: 1,
  }),

  // child
  check('child', 'child only number')
    .optional({
      nullable: true,
      checkFalsy: true,
    })
    .isNumeric(),

  // email
  check('email', 'Email required').not().isEmpty(),
  check('email', 'please enter email correctly').isEmail(),
  check('email', 'Email maximum length is 50 characters').isLength({ max: 50 }),

  // phone
  check('phone', 'Phone cannot be empty').not().isEmpty(),
  check('phone', 'please enter phone correctly').isNumeric(),
  check('phone', 'Phone require 12 or more characters').isLength({
    min: 12,
    max: 20,
  }),

  // paxName
  check('paxName', 'Pax Name cannot be empty').not().isEmpty(),
  check('paxName', 'Pax Name require 2 or more characters').isLength({
    min: 2,
  }),
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
