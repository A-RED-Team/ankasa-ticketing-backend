const userModel = require('../models/user.model');
const { success, failed } = require('../helpers/response');
const deleteFile = require('../utils/deleteFile');

const userController = {
  listAllUser: async (req, res) => {
    try {
      let { sortField, sortType, page, limit, search } = req.query;
      page = Number(page);
      limit = Number(limit);
      const getSearch = !search ? '' : search;
      const sortByField = !sortField ? 'id' : sortField;
      const sortByType =
        sortType === 'ASC' || sortType === 'DESC' ? sortType : 'ASC';
      const getPage = !page ? 1 : page;
      const getLimit = !limit ? 10 : limit;
      const offset = (getPage - 1) * getLimit;
      const allData = await userModel.getCountUsers();
      const totalData = Number(allData.rows[0].total);
      const result = await userModel.selectAllUsers(
        sortByField,
        sortByType,
        getLimit,
        offset,
        getSearch
      );
      if (result.rowCount === 0) {
        failed(res, {
          code: 400,
          status: 'error',
          message: 'data not found',
          error: null,
        });
        return;
      }
      if (search) {
        const pagination = {
          currentPage: getPage,
          currentLimit: getLimit,
          totalPage: Math.ceil(result.rowCount / getLimit),
        };
        success(res, {
          code: 200,
          status: 'success',
          message: 'get user sucesss',
          data: result,
          pagination,
        });
      } else {
        const pagination = {
          currentPage: getPage,
          currentLimit: getLimit,
          totalPage: Math.ceil(totalData / getLimit),
        };
        success(res, {
          code: 201,
          status: 'success',
          message: 'get all users sucesss',
          data: result,
          pagination,
        });
      }
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'error',
        message: 'get all users failed',
        error: err.message,
      });
    }
  },
  detalUserId: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await userModel.getDetail(id);
      success(res, {
        code: 200,
        status: 'success',
        message: 'get detail user sucesss',
        data: result,
      });
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'error',
        message: 'get detail user failed',
        error: err.message,
      });
    }
  },
  updateProfile: async (req, res) => {
    try {
      // const id = req.APP_DATA.tokenDecoded.id;
      const id = '1';
      const { email, username, phone, city, address, postCode } = req.body;
      if (!username || !phone || !email || !city || !address || !postCode) {
        failed(res, {
          code: 400,
          status: 'error',
          message: 'all data must be filled',
          error: null,
        });
        return;
      }
      const result = await userModel.updateProfile(
        email,
        username,
        phone,
        city,
        address,
        postCode,
        id
      );
      success(res, {
        code: 200,
        status: 'success',
        message: 'update user success',
        data: result,
      });
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'failed',
        message: 'Update failed',
        error: err.message,
      });
    }
  },
  updatePhoto: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.id;
      const photo = await userModel.getPhoto(id);
      // ----------------------------
      if (photo === 'foto default') {
        const result = await userModel.updatePhoto(id);
        success(res, {
          code: 200,
          status: 'success',
          message: 'update photo success',
          data: result,
        });
      } else {
        const result = await userModel.updatePhoto(id);
        success(res, {
          code: 200,
          status: 'success',
          message: 'update photo success',
          data: result,
        });
        deleteFile(`./public/${photo}`);
      }
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'failed',
        message: 'Update photo failed',
        error: err.message,
      });
    }
  },
};

module.exports = userController;
