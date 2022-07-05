const userModel = require('../models/user.model');
const { success, failed } = require('../helpers/response');
const deleteFile = require('../utils/deleteFile');
const uploadGoogleDrive = require('../utils/uploadGoogleDrive');
const deleteGoogleDrive = require('../utils/deleteGoogleDrive');

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
          data: result.rows,
          pagination,
        });
      } else {
        const pagination = {
          currentPage: getPage,
          currentLimit: getLimit,
          totalPage: Math.ceil(totalData / getLimit),
        };
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Get all users success',
          data: result.rows,
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
      const { name, email, username, phone, city, address, postCode } =
        req.body;
      const emailCheck = await userModel.emailCheck(email);
      const usernameCheck = await userModel.usernameCheck(username);
      if (username != req.APP_DATA.tokenDecoded.username) {
        if (usernameCheck.rowCount > 0) {
          failed(res, {
            code: 400,
            status: 'Error',
            message: 'Username is already exist',
            error: null,
          });
          return;
        }
      }
      if (email != req.APP_DATA.tokenDecoded.email) {
        if (emailCheck.rowCount > 0) {
          failed(res, {
            code: 400,
            status: 'Error',
            message: 'Email is already exist',
            error: null,
          });
          return;
        }
      }
      const result = await userModel.updateProfile(
        name,
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
        message: 'Update profile user success',
        data: result,
      });
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Failed',
        message: 'Update profile user failed',
        error: err.message,
      });
    }
  },
  updatePhoto: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.id;
      const user = await userModel.getDetail(id);

      if (!user.rowCount) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        return failed(res, {
          code: 404,
          message: `User with id ${id} not found`,
          error: 'Not Found',
        });
      }

      // upload image to google drive
      let { photo } = user.rows[0];
      if (req.file) {
        if (photo) {
          // remove old image except default image
          deleteGoogleDrive(photo);
        }
        // upload new image to google drive
        const photoGd = await uploadGoogleDrive(req.file);
        photo = photoGd.id;
        // remove image after upload
        deleteFile(req.file.path);
      }

      const result = await userModel.updatePhoto(photo, id);
      success(res, {
        code: 200,
        status: 'Success',
        message: 'Update photo success',
        data: result,
      });
    } catch (err) {
      if (req.file) {
        deleteFile(req.file.path);
      }
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const id = req.params.id;
      const { status } = req.body;
      const getUserDetail = await userModel.getDetail(id);
      if (getUserDetail.rowCount == 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: `User with Id ${id} not found`,
          error: null,
        });
        return;
      }
      if (getUserDetail.rows[0].is_active == status) {
        if (status == '1') {
          failed(res, {
            code: 400,
            status: 'Error',
            message: `User with id ${id} have been active`,
            error: null,
          });
        } else {
          failed(res, {
            code: 400,
            status: 'Error',
            message: `User with id ${id} have been non active`,
            error: null,
          });
        }
        return;
      }
      if (status === '0') {
        const result = await userModel.updateIsActive(status, id);
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Update status user success',
          data: req.body,
        });
      } else {
        const result = await userModel.updateNonActive(status, id);
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Update status user success',
          data: req.body,
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
      const getUserDetail = await userModel.getDetail(id);
      if (getUserDetail.rowCount == 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: `User with Id ${id} not found`,
          error: null,
        });
        return;
      }
      if (getUserDetail.rows[0].level == level) {
        if (level == '1') {
          failed(res, {
            code: 400,
            status: 'Error',
            message: `User with id ${id} have become admin`,
            error: null,
          });
        } else {
          failed(res, {
            code: 400,
            status: 'Error',
            message: `User with id ${id} have become customer`,
            error: null,
          });
        }
        return;
      }
      const result = await userModel.updateLevel(level, id);
      success(res, {
        code: 200,
        status: 'Success',
        message: 'Update level user success',
        data: req.body,
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
