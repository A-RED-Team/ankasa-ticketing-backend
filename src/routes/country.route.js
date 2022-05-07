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
  .get('/get-all-country', jwtAuth, isAdmin, getAllCountry)
  .get('/get-detail-country/:countryId', jwtAuth, isAdmin, getDetailCountry)
  .post(
    '/insert-country',
    jwtAuth,
    isAdmin,
    countryValidation,
    validation,
    insertCountry
  )
  .put(
    '/update-country/:countryId',
    jwtAuth,
    isAdmin,
    countryValidation,
    validation,
    updateCountry
  )
  .put(
    '/country-isactive/:countryId',
    jwtAuth,
    isAdmin,
    countryIsActive,
    validation,
    countryNonActive
  );

module.exports = router;
