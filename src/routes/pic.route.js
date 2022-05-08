const express = require('express');
const {
  picInsert,
  picDetail,
  picUpdate,
  picMode,
  picAll,
} = require('../controllers/pic.controller');
const validation = require('../middlewares/validation');
const jwtAuth = require('../middlewares/jwtAuth');
const { isAdmin, isCustomers } = require('../middlewares/authorization');
const {
  createValidation,
  updateValidation,
  modeValidation,
} = require('../validations/pic.validation');
const router = express.Router();

router
  .get('/pic', jwtAuth, isAdmin, picAll) // get all pic (ADMIN)
  .get('/pic/:id', jwtAuth, picDetail) // get pic by id (NEED LOGIN)
  .post('/pic', jwtAuth, isAdmin, createValidation, validation, picInsert) // add pic (ADMIN)
  .put('/pic/:id', jwtAuth, isAdmin, updateValidation, validation, picUpdate) // update pic (ADMIN)
  .put(
    '/pic-status/:id',
    jwtAuth,
    isAdmin,
    modeValidation,
    validation,
    picMode
  ); // update status pic (ADMIN ONLY)

module.exports = router;
