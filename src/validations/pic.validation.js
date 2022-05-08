const { check } = require('express-validator');

const createValidation = [
  // username
  check('name', 'username cannot be empty').not().isEmpty(),
  check('name', 'username only letter allowed').matches(/^[A-Za-z ]+$/),
  check('name', 'username must be between 3 and 50 characters').isLength({
    min: 3,
    max: 50,
  }),

  // email
  check('email', 'Email required').not().isEmpty(),
  check('email', 'please enter email correctly').isEmail(),
  check('email', 'Email maximum length is 50 characters').isLength({ max: 50 }),

  // PHONE NUMBER
  check('phoneNumber', 'Phone Number required').not().isEmpty(),
  check('phoneNumber', 'Please Enter phone Number correctly').isMobilePhone(),
];
const updateValidation = [
  // username
  check('name', 'username cannot be empty').not().isEmpty(),
  check('name', 'username only letter allowed').matches(/^[A-Za-z ]+$/),
  check('name', 'username must be between 3 and 50 characters').isLength({
    min: 3,
    max: 50,
  }),

  // email
  check('email', 'Email required').not().isEmpty(),
  check('email', 'please enter email correctly').isEmail(),
  check('email', 'Email maximum length is 50 characters').isLength({ max: 50 }),

  // PHONE NUMBER
  check('phoneNumber', 'Phone Number required').not().isEmpty(),
  check('phoneNumber', 'Please Enter phone Number correctly').isMobilePhone(),
];

const modeValidation = [
  // isActive
  check('isActive', 'isActive cannot be empty').not().isEmpty(),
  check('isActive', 'isActive value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),
];

module.exports = {
  createValidation,
  updateValidation,
  modeValidation,
};
