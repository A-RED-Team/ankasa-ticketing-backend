const { check } = require('express-validator');

const cityValidation = [
  // countryId
  check('countryId', 'Country Id cannot be empty').not().isEmpty(),
  check('countryId', 'Country Id require 1 or more characters').isLength({
    min: 1,
    max: 255,
  }),

  // cityName
  check('cityName', 'Name City cannot be empty').not().isEmpty(),
  check('cityName', 'Name City require 3 or more characters').isLength({
    min: 3,
    max: 20,
  }),
];

const nameCityValidation = [
  // cityName
  check('cityName', 'Name City cannot be empty').not().isEmpty(),
  check('cityName', 'Name City require 3 or more characters').isLength({
    min: 3,
    max: 20,
  }),
];

const cityIsActive = [
  // is active
  check('isActive', 'isActive cannot be empty').not().isEmpty(),
  check('isActive', 'isActive only number 0 or 1').isNumeric(),
  check('isActive', 'isActive value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),
];

module.exports = { cityValidation, nameCityValidation, cityIsActive };
