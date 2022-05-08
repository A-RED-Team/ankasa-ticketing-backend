const express = require('express');
const {
  getAllCountry,
  getDetailCountry,
  insertCountry,
  updateCountry,
  countryNonActive,
} = require('../controllers/country.controller');
const jwtAuth = require('../middlewares/jwtAuth');
const { isAdmin, isCustomers } = require('../middlewares/authorization');
const validation = require('../middlewares/validation');
const {
  countryValidation,
  countryIsActive,
} = require('../validations/country.validation');

const router = express.Router();

router
  .get('/country', jwtAuth, isAdmin, getAllCountry)
  .get('/country/:countryId', jwtAuth, isAdmin, getDetailCountry)
  .post(
    '/country',
    jwtAuth,
    isAdmin,
    countryValidation,
    validation,
    insertCountry
  )
  .put(
    '/country/:countryId',
    jwtAuth,
    isAdmin,
    countryValidation,
    validation,
    updateCountry
  )
  .put(
    '/country/status/:countryId',
    jwtAuth,
    isAdmin,
    countryIsActive,
    validation,
    countryNonActive
  );

module.exports = router;
