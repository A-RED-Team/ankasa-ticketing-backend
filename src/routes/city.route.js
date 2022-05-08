const express = require('express');
const {
  getAllCity,
  getCityPublic,
  getDetailCity,
  insertCity,
  updateCity,
  deleteCity,
} = require('../controllers/city.controller');
const jwtAuth = require('../middlewares/jwtAuth');
const { isAdmin, isCustomers } = require('../middlewares/authorization');
const cityUpload = require('../middlewares/cityUpload');
const validation = require('../middlewares/validation');
const {
  cityValidation,
  nameCityValidation,
  cityIsActive,
} = require('../validations/city.validation');

const router = express.Router();

router
  .get('/city', jwtAuth, isAdmin, getAllCity)
  .get('/city/public', jwtAuth, isCustomers, getCityPublic)
  .get('/city/detail/:cityId', jwtAuth, getDetailCity)
  .post(
    '/city',
    jwtAuth,
    isAdmin,
    cityUpload,
    cityValidation,
    validation,
    insertCity
  )
  .put(
    '/city/:cityId',
    jwtAuth,
    isAdmin,
    cityUpload,
    nameCityValidation,
    validation,
    updateCity
  )
  .put(
    '/city/status/:cityId',
    jwtAuth,
    isAdmin,
    cityIsActive,
    validation,
    deleteCity
  );

module.exports = router;
