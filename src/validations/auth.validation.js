const { check } = require('express-validator');

const register = [
  // username
  check('username', 'username cannot be empty').not().isEmpty(),
  check('username', 'username only letter allowed').matches(/^[A-Za-z ]+$/),
  check('username', 'username must be between 3 and 50 characters').isLength({
    min: 3,
    max: 50,
  }),
];

module.exports = {
  register,
};
