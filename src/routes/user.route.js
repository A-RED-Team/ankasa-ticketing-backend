const express = require('express');
const {
  listAllUser,
  detailUserId,
  updateProfile,
  updatePhoto,
  updateStatus,
  updateLevel,
} = require('../controllers/user.controller');
const {
  profileValidation,
  isActiveValidation,
  levelValidation,
} = require('../validations/user.validation');
const validation = require('../middlewares/validation');
const jwtAuth = require('../middlewares/jwtAuth');
const { isAdmin, isCustomers } = require('../middlewares/authorization');
const upload = require('../middlewares/upload');

const router = express.Router();

router
  .get('/users', jwtAuth, isAdmin, listAllUser)
  .get('/users/:id', jwtAuth, detailUserId)
  .put(
    '/users/update/profile',
    jwtAuth,
    isCustomers,
    profileValidation,
    validation,
    updateProfile
  )
  .put('/users/update/photo', jwtAuth, isCustomers, upload, updatePhoto)
  .put(
    '/users/status/:id',
    jwtAuth,
    isAdmin,
    isActiveValidation,
    validation,
    updateStatus
  )
  .put(
    '/users/level/:id',
    jwtAuth,
    isAdmin,
    levelValidation,
    validation,
    updateLevel
  );

module.exports = router;
