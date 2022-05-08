const { check } = require('express-validator');

const createValidation = [
  // airlineId
  check('airlineId', 'airlineId cannot be empty').not().isEmpty(),

  // departureCity
  check('departureCity', 'departureCity cannot be empty').not().isEmpty(),

  //arrivalCity
  check('arrivalCity', 'arrivalCity cannot be empty').not().isEmpty(),

  //departureTime
  check('departureTime', 'departureTime cannot be empty').not().isEmpty(),

  //arrivalTime
  check('arrivalTime', 'arrivalTime cannot be empty').not().isEmpty(),

  //code
  check('code', 'code cannot be empty').not().isEmpty(),

  //classs
  check('classs', 'classs cannot be empty').not().isEmpty(),
  check('classs', 'classs value must be between 0 to 2').isInt({
    min: 0,
    max: 2,
  }),

  //type
  check('type', 'type cannot be empty').not().isEmpty(),
  check('type', 'type value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),

  //departureDate
  check('departureDate', 'departureDate cannot be empty').not().isEmpty(),
  check('departureDate', 'departureDate must be valid date').isDate(),

  //adult
  check('adult', 'adult cannot be empty').not().isEmpty(),
  check('adult', 'adult must be integer').isInt(),

  //child
  check('child', 'child cannot be empty').not().isEmpty(),
  check('child', 'child must be integer').isInt(),

  //direct
  check('direct', 'direct cannot be empty').not().isEmpty(),
  check('direct', 'direct value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),

  //transit
  check('transit', 'transit cannot be empty').not().isEmpty(),
  check('transit', 'transit value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),

  //moreTransit
  check('moreTransit', 'moreTransit cannot be empty').not().isEmpty(),
  check('moreTransit', 'moreTransit value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),

  //luggage
  check('luggage', 'luggage cannot be empty').not().isEmpty(),
  check('luggage', 'luggage value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),

  //meal
  check('meal', 'meal cannot be empty').not().isEmpty(),
  check('meal', 'meal value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),

  //price
  check('price', 'price cannot be empty').not().isEmpty(),
  check('price', 'price value must be Integer').isInt(),

  //idPic
  check('idPic', 'IdPic cannot be empty').not().isEmpty(),
];
const updateValidation = [
  // airlineId
  check('airlineId', 'airlineId cannot be empty').not().isEmpty(),

  // departureCity
  check('departureCity', 'departureCity cannot be empty').not().isEmpty(),

  //arrivalCity
  check('arrivalCity', 'arrivalCity cannot be empty').not().isEmpty(),

  //departureTime
  check('departureTime', 'departureTime cannot be empty').not().isEmpty(),

  //arrivalTime
  check('arrivalTime', 'arrivalTime cannot be empty').not().isEmpty(),

  //code
  check('code', 'code cannot be empty').not().isEmpty(),

  //classs
  check('classs', 'classs cannot be empty').not().isEmpty(),
  check('classs', 'classs value must be between 0 to 2').isInt({
    min: 0,
    max: 2,
  }),

  //type
  check('type', 'type cannot be empty').not().isEmpty(),
  check('type', 'type value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),

  //departureDate
  check('departureDate', 'departureDate cannot be empty').not().isEmpty(),
  check('departureDate', 'departureDate must be valid date').isDate(),

  //adult
  check('adult', 'adult cannot be empty').not().isEmpty(),
  check('adult', 'adult must be integer').isInt(),

  //child
  check('child', 'child cannot be empty').not().isEmpty(),
  check('child', 'child must be integer').isInt(),

  //direct
  check('direct', 'direct cannot be empty').not().isEmpty(),
  check('direct', 'direct value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),

  //transit
  check('transit', 'transit cannot be empty').not().isEmpty(),
  check('transit', 'transit value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),

  //moreTransit
  check('moreTransit', 'moreTransit cannot be empty').not().isEmpty(),
  check('moreTransit', 'moreTransit value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),

  //luggage
  check('luggage', 'luggage cannot be empty').not().isEmpty(),
  check('luggage', 'luggage value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),

  //meal
  check('meal', 'meal cannot be empty').not().isEmpty(),
  check('meal', 'meal value must be between 0 to 1').isInt({
    min: 0,
    max: 1,
  }),

  //price
  check('price', 'price cannot be empty').not().isEmpty(),
  check('price', 'price value must be Integer').isInt(),

  //idPic
  check('idPic', 'IdPic cannot be empty').not().isEmpty(),
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
