const express = require('express');
const {
  listAllUser,
  detailUserId,
  updateProfile,
  updatePhoto,
  updateStatus,
  deleteUser,
} = require('../controllers/user.controller');
const jwtAuth = require('../middlewares/jwtAuth');
const { isAdmin, isCustomers } = require('../middlewares/authorization');
const upload = require('../middlewares/upload');

const router = express.Router();

router
  .get('/users', jwtAuth, isAdmin, listAllUser)
  .get('/users/:id', jwtAuth, detailUserId)
  .put('/users-update', jwtAuth, isCustomers, updateProfile)
  .put('/users-photo', jwtAuth, isCustomers, upload, updatePhoto)
  .put('/users-status/:id', jwtAuth, isAdmin, updateStatus)
  .delete('/users-delete/:id', jwtAuth, isAdmin, deleteUser);

module.exports = router;
