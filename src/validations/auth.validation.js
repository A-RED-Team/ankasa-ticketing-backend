const { check } = require('express-validator');

const registerValidation = [
  // username
  check('username', 'username cannot be empty').not().isEmpty(),
  check('username', 'username only letter allowed').matches(/^[A-Za-z ]+$/),
  check('username', 'username must be between 3 and 50 characters').isLength({
    min: 3,
    max: 50,
  }),

  // email
  check('email', 'Email required').not().isEmpty(),
  check('email', 'please enter email correctly').isEmail(),
  check('email', 'Email maximum length is 50 characters').isLength({ max: 50 }),

  //password
  check('password', 'Password required').not().isEmpty(),
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

const forgotValidation = [
  // email
  check('email', 'Email required').not().isEmpty(),
  check('email', 'please enter email correctly').isEmail(),
];

const resetValidation = [
  // password
  check('password', 'Password required').not().isEmpty(),
  check('password', 'Password require 8 or more characters').isLength({
    min: 8,
  }),
  check(
    'password',
    'Password must include one lowercase character, one uppercase character, a number, and a special character.'
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),

  // confirm password
  check('passwordConfirmation', 'Password confirmation required').not().isEmpty(),
  check('passwordConfirmation').custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }
    return true
  })
];

module.exports = {
  registerValidation,
  loginValidation,
  forgotValidation,
  resetValidation
};
