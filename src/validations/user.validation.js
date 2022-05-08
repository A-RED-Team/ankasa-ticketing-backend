const { check } = require('express-validator');

const profileValidation = [
  // username
  check('username', 'username cannot be empty').not().isEmpty(),
  check('username', 'username only letter allowed').matches(/^[A-Za-z ]+$/),
  check('username', 'username must be between 3 and 50 characters').isLength({
    min: 3,
    max: 50,
  }),

  // email
  check('email', 'Email cannot be empty').not().isEmpty(),
  check('email', 'please enter email correctly').isEmail(),
  check('email', 'Email maximum length is 50 characters').isLength({ max: 50 }),

  //phone
  check('phone', 'Phone cannot be empty').not().isEmpty(),
  check('phone', 'please enter phone correctly').isNumeric(),
  check('phone', 'Phone require 12 or more characters').isLength({
    min: 12,
    max: 20,
  }),

  //city
  check('city', 'City cannot be empty').not().isEmpty(),
  check('city', 'City require 3 or more characters').isLength({
    min: 3,
  }),

  //address
  check('address', 'Address cannot be empty').not().isEmpty(),
  check('address', 'Address require 3 or more characters').isLength({
    min: 3,
  }),

  //address
  check('postCode', 'Postcode cannot be empty').not().isEmpty(),
  check('postCode', 'Postcode require 6 or more characters').isLength({
    min: 6,
  }),
];

const levelValidation = [
  // level
  check('level', 'level cannot be empty').not().isEmpty(),
  check('level', 'level only number 0 or 1').isNumeric(),
  check('level', 'level require 1 characters').isLength({
    min: 1,
  }),
];

const isActiveValidation = [
  // is active
  check('status', 'status cannot be empty').not().isEmpty(),
  check('status', 'status only number 0 or 1').isNumeric(),
  check('status', 'status require 1 characters').isLength({
    min: 1,
  }),
];

module.exports = { profileValidation, isActiveValidation, levelValidation };
