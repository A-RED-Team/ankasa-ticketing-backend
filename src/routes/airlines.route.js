const express = require('express');

// import jwtauth
const jwtAuth = require('../middlewares/jwtAuth');

// import authorization
const { isAdmin, isCustomer } = require('../middlewares/authorization');

// import validation rule
const {
  createValidation,
  updateValidation,
  modeValidation,
} = require('../validations/airlines.validation');

// import validation
const validation = require('../middlewares/validation');

// import middleware upload
const airlineUpload = require('../middlewares/airlineUpload');

// import controller
const {
  airlinesInsert,
  airlinesDetail,
  airlinesUpdate,
  airlinesMode,
  airlinesAll,
} = require('../controllers/airlines.controller');

const router = express.Router();

router
  .get('/airline', jwtAuth, isAdmin, airlinesAll) // get airline
  .get('/airline/:id', jwtAuth, isAdmin, airlinesDetail) // get airline detail
  .post(
    '/airline',
    jwtAuth,
    isAdmin,
    airlineUpload,
    createValidation,
    validation,
    airlinesInsert
  ) // create airline
  .put(
    '/airline/:id',
    jwtAuth,
    isAdmin,
    airlineUpload,
    updateValidation,
    validation,
    airlinesUpdate
  ) // update airline
  .put(
    '/airline/mode/:id',
    jwtAuth,
    isAdmin,
    modeValidation,
    validation,
    airlinesMode
  ); // active or nonactive airline

module.exports = router;
