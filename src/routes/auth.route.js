const express = require('express');
const {
  registerValidation,
  loginValidation,
} = require('../validations/auth.validation');
const validation = require('../middlewares/validation');
const { register, login } = require('../controllers/auth.controller');

const router = express.Router();

router
  .post('/auth/register', registerValidation, validation, register) // register endpoint
  .post('/auth/login', loginValidation, login) // login endpoint
  .post('/auth/verify-email');

module.exports = router;
