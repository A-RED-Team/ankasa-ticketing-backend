const express = require('express');

// import jwtauth
const jwtAuth = require('../middlewares/jwtAuth');

// import authorization
const { isAdmin, isCustomers } = require('../middlewares/authorization');

// import validation rule
const {
  createValidation,
  updateValidation,
  modeValidation,
} = require('../validations/airlines.validation');

// import validation
const validation = require('../middlewares/validation');

// import middleware upload
const upload = require('../middlewares/upload');

// import controller
const {
  airlinesInsert,
  airlinesDetail,
  airlinesUpdate,
  airlinesMode,
  airlinesAll,
  airlinesActive,
  airlinesDelete,
} = require('../controllers/airlines.controller');

const router = express.Router();

router
  .get('/airline', jwtAuth, isAdmin, airlinesAll) // get airline
  .get('/airline-active', jwtAuth, isCustomers, airlinesActive) // get airline active(customer)
  .get('/airline/:id', jwtAuth, isAdmin, airlinesDetail) // get airline detail
  .post(
    '/airline',
    jwtAuth,
    isAdmin,
    upload,
    createValidation,
    validation,
    airlinesInsert
  ) // create airline
  .put(
    '/airline/:id',
    jwtAuth,
    isAdmin,
    upload,
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
  ) // active or nonactive airline
  .delete('/airline/:id', jwtAuth, isAdmin, airlinesDelete); // for delete airlines (ADMIN ONLY)
module.exports = router;
