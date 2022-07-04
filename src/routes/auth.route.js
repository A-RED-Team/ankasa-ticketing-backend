const express = require('express');

const { isVerified } = require('../middlewares/authorization');
const {
  registerValidation,
  loginValidation,
  forgotValidation,
  resetValidation,
} = require('../validations/auth.validation');
const validation = require('../middlewares/validation');
const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth.controller');

const router = express.Router();

router
  .get('/auth/activation/:token', verifyEmail) //email verify endpoint
  .post('/auth/register', registerValidation, validation, register) // register endpoint
  .post('/auth/login', isVerified, loginValidation, validation, login) // login endpoint
  .put('/auth/forgot', isVerified, forgotValidation, validation, forgotPassword) // forgot password end point
  .put('/auth/reset/:token', resetValidation, validation, resetPassword); // reset password end point

module.exports = router;
