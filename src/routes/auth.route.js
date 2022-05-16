const express = require('express');

const { isVerified } = require('../middlewares/authorization');
const {
  registerValidation,
  loginValidation,
  forgotValidation,
  resetValidation
} = require('../validations/auth.validation');
const validation = require('../middlewares/validation');
const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword
} = require('../controllers/auth.controller');


const router = express.Router();

router
  .get('/auth/verify-email', verifyEmail) //email verify endpoint
  .post('/auth/register', registerValidation, validation, register) // register endpoint
  .post('/auth/login', loginValidation, validation, login) // login endpoint
  .put(
    '/auth/forgot-password',
    isVerified,
    forgotValidation,
    validation,
    forgotPassword
  ) // forgot password end point
  .put(
    '/auth/reset-password',
    resetValidation,
    validation,
    resetPassword
  ); // reset password end point 

module.exports = router;
