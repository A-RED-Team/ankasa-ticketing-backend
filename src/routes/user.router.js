const express = require('express');
const {
  listAllUser,
  detalUserId,
  updateProfile,
  updatePhoto,
} = require('../controllers/user.controller');
const jwtAuth = require('../middlewares/jwtAuth');
const { isAdmin, isCustomers } = require('../middlewares/authorization');
const upload = require('../middlewares/upload');

const router = express.Router();

router
  .get('/users', listAllUser)
  .get('/users/:id', detalUserId)
  .put('/users-update', updateProfile)
  .put('/user-photo', upload, updatePhoto);

module.exports = router;
