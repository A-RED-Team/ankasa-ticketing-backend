const { check } = require('express-validator');

const createValidation = [
  // name
  check('name', 'name cannot be empty').not().isEmpty(),
  check('name', 'name only letter allowed').matches(/^[A-Za-z ]+$/),
  check('name', 'name must be between 5 and 50 characters').isLength({
    min: 5,
    max: 50,
  }),
];
const updateValidation = [
  // name
  check('name', 'name cannot be empty').not().isEmpty(),
  check('name', 'name only letter allowed').matches(/^[A-Za-z ]+$/),
  check('name', 'name must be between 5 and 50 characters').isLength({
    min: 5,
    max: 50,
  }),
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
