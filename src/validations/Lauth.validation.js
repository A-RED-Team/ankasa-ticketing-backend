const { check } = require('express-validator');

// validation register
console.log('h');
const registerValidation = [
  // username
  check('username', 'Username required').not().isEmpty,
  check('username', 'Name maximum length is 50 characters').isLength({
    max: 50,
  }),

  // email
  check('email', 'Email required').not().isEmpty(),
  check('email', 'please enter email correctly').isEmail(),
  check('email', 'Email maximum length is 50 characters').isLength({ max: 50 }),

  //password
  check('password', 'Password require 8 or more characters').isLength({
    min: 8,
  }),
  check(
    'password',
    'Password must include one lowercase character, one uppercase character, a number, and a special character.'
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),
];
const loginValidation = [
  // username
  check('username', 'Username required').not().isEmpty(),
  // password
  check('password', 'Password required').not().isEmpty(),
];

module.exports = {
  loginValidation,
  registerValidation,
};
