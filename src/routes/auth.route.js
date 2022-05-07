const express = require('express');
const {
  registerValidation,
  loginValidation,
} = require('../validations/auth.validation');
const validation = require('../middlewares/validation');
const {
  register,
  login,
  verifyEmail,
} = require('../controllers/auth.controller');

const router = express.Router();

router
  .get('/auth/verify-email', verifyEmail) //email verify endpoint
  .post('/auth/register', registerValidation, validation, register) // register endpoint
  .post('/auth/login', loginValidation, validation, login); // login endpoint

module.exports = router;
