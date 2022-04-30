const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const authValidation = require('../validations/Lauth.validation');
const validation = require('../middlewares/validations.js');
const router = express.Router();
// authValidation.registerValidation,
//   validation,
router
  .post('/register', register) // register endpoint
  // .post('/login', loginValidation, login) // login endpoint
  .post('login/verify');

module.exports = router;
