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
          status: 'Error',
          message: 'Data not found',
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
          status: 'Success',
          message: 'Get user success',
          data: result.rows[0],
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
          status: 'Success',
          message: 'Get all users success',
          data: result.rows[0],
          pagination,
        });
      }
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Get all users failed',
        error: err.message,
      });
    }
  },
  detailUserId: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await userModel.getDetail(id);
      if (result.rowCount === 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: 'Id not found',
          error: null,
        });
        return;
      }
      success(res, {
        code: 200,
        status: 'Success',
        message: 'Get detail user success',
        data: result.rows[0],
      });
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Get detail user failed',
        error: err.message,
      });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.id;
      const { email, username, phone, city, address, postCode } = req.body;
      const emailCheck = await userModel.emailCheck(email);
      const usernameCheck = await userModel.usernameCheck(username);
      if (
        username == req.APP_DATA.tokenDecoded.username &&
        email == req.APP_DATA.tokenDecoded.email
      ) {
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
          status: 'Success',
          message: 'Update user success',
          data: result,
        });
        return;
      }
      if (emailCheck.rowCount > 0 || usernameCheck.rowCount > 0) {
        failed(res, {
          code: 400,
          status: 'error',
          message: 'Username or Email already exist',
          error: null,
        });
        return;
      }
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Failed',
        message: 'Update failed',
        error: err.message,
      });
    }
  },
  updatePhoto: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.id;
      const checkPhoto = await userModel.getPhoto(id);
      const getPhoto = checkPhoto.rows[0].photo;
      const filePhoto = req.file.filename;
      if (getPhoto === 'profile-default.png') {
        const result = await userModel.updatePhoto(filePhoto, id);
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Update photo success',
          data: result,
        });
      } else {
        const result = await userModel.updatePhoto(filePhoto, id);
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Update photo success',
          data: result,
        });
        deleteFile(`./public/uploads/users/${getPhoto}`);
      }
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Failed',
        message: 'Update photo failed',
        error: err.message,
      });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const id = req.params.id;
      const { status } = req.body;
      if (status === '0') {
        const result = await userModel.updateIsActive(status, id);
        if (result.rowCount === 0) {
          failed(res, {
            code: 400,
            status: 'Error',
            message: 'Id not found',
            error: null,
          });
          return;
        }
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Update status user success',
          data: result,
        });
      } else {
        const result = await userModel.updateNonActive(status, id);
        if (result.rowCount === 0) {
          failed(res, {
            code: 400,
            status: 'Error',
            message: 'Id not found',
            error: null,
          });
          return;
        }
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Update status user success',
          data: result,
        });
      }
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Update status user failed',
        error: err.message,
      });
    }
  },
  updateLevel: async (req, res) => {
    try {
      const id = req.params.id;
      const { level } = req.body;
      const result = await userModel.updateLevel(level, id);
      if (result.rowCount === 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: 'Id not found',
          error: null,
        });
        return;
      }
      success(res, {
        code: 200,
        status: 'Success',
        message: 'Update level user success',
        data: result,
      });
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Update level user failed',
        error: err.message,
      });
    }
  },
  // deleteUser: async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     const checkIsActive = await userModel.getDetail(id);
  //     const getIsActive = checkIsActive.rows[0].is_active;
  //     const checkPhoto = await userModel.getPhoto(id);
  //     const getPhoto = checkPhoto.rows[0].photo;
  //     if (getIsActive === 1) {
  //       failed(res, {
  //         code: 400,
  //         status: 'Error',
  //         message: 'User active',
  //         error: null,
  //       });
  //     } else {
  //       const result = await userModel.deleteUser(id);
  //       if (result.rowCount === 0) {
  //         failed(res, {
  //           code: 400,
  //           status: 'Error',
  //           message: 'Id not found',
  //           error: null,
  //         });
  //         return;
  //       }
  //       success(res, {
  //         code: 200,
  //         status: 'Success',
  //         message: 'Delete user sucesss',
  //         data: result,
  //       });
  //       deleteFile(`./public/uploads/users/${getPhoto}`);
  //     }
  //   } catch (err) {
  //     failed(res, {
  //       code: 400,
  //       status: 'Error',
  //       message: 'Delete user failed',
  //       error: err.message,
  //     });
  //   }
  // },
};

module.exports = userController;
