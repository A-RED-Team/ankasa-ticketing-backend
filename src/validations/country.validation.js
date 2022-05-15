const { check } = require('express-validator');

const countryValidation = [
  // nameCountry
  check('nameCountry', 'Name Country cannot be empty').not().isEmpty(),
  check('nameCountry', 'Name Country require 4 or more characters').isLength({
    min: 4,
    max: 20,
  }),

  // aliasCountry
  check('aliasCountry', 'Alias Country cannot be empty').not().isEmpty(),
  check('aliasCountry', 'Alias Country is Uppercase').isUppercase(),
  check('aliasCountry', 'Alias Country require 2 or more characters').isLength({
    min: 2,
    max: 20,
  }),
];

const countryIsActive = [
  // is active
  check('isActive', 'isActive cannot be empty').not().isEmpty(),
  check('isActive', 'isActive only number 0 or 1').isNumeric(),
  check('isActive', 'isActive value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),
];

module.exports = { countryValidation, countryIsActive };
