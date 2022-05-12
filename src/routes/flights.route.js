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
} = require('../validations/flights.validation');

// import validation
const validation = require('../middlewares/validation');

// import controller
const {
  flightsInsert,
  flightsDetail,
  flightsUpdate,
  flightsMode,
  flightsDelete,
  flightsAll,
  flightsActive,
} = require('../controllers/flights.controller');

const router = express.Router();

router
  .get('/flight', jwtAuth, isAdmin, flightsAll) // for get all flight (ADMIN ONLY)
  .get('/flight/:id', jwtAuth, flightsDetail) // for get flight detail by id
  .get('/flight-customers', jwtAuth, isCustomers, flightsActive) // for get flight latest (PUBLIC)
  .post(
    '/flight',
    jwtAuth,
    isAdmin,
    createValidation,
    validation,
    flightsInsert
  ) // for create flight (ADMIN ONLY)
  .put(
    '/flight/:id',
    jwtAuth,
    isAdmin,
    updateValidation,
    validation,
    flightsUpdate
  ) // for update flight (ADMIN ONLY)
  .put(
    '/flight/mode/:id',
    jwtAuth,
    isAdmin,
    modeValidation,
    validation,
    flightsMode
  ) // for active/non active flight (ADMIN ONLY)
  .delete('/flight/:id', jwtAuth, isAdmin, flightsDelete) // for delete flight (ADMIN ONLY)
  .get('/flight-active', jwtAuth, isCustomers, flightsActive); // for get flight active (customer only)
module.exports = router;
