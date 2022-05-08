const { success, failed } = require('../helpers/response');

const { v4: uuidv4 } = require('uuid');

const picModel = require('../models/pic.model');

module.exports = {
  picAll: async (req, res) => {
    try {
      const { field, search, page, limit, sort, mode } = req.query;
      const fieldQuery = field ? field : 'name';
      const searchQuery = search || '';
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 10;
      const offsetValue = (pageValue - 1) * limitValue;
      const sortQuery = sort ? sort : 'name';
      const modeQuery = mode ? mode : 'ASC';
      const allData = await picModel.allData();
      const totalData = Number(allData.rows[0].total);
      const data = {
        fieldQuery,
        searchQuery,
        offsetValue,
        limitValue,
        sortQuery,
        modeQuery,
      };
      const goQuery = await picModel.picAllData(data);
      if (goQuery.rowCount === 0) {
        const err = {
          message: `data not found`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      if (search) {
        const pagination = {
          currentPage: pageValue,
          dataPerPage: limitValue,
          totalPage: Math.ceil(goQuery.rowCount / limitValue),
        };
        success(res, {
          code: 200,
          status: 'success',
          message: `Success get data pic`,
          data: goQuery.rows,
          pagination: pagination,
        });
      } else {
        const pagination = {
          currentPage: pageValue,
          dataPerPage: limitValue,
          totalPage: Math.ceil(totalData / limitValue),
        };
        console.log(pagination);
        success(res, {
          code: 200,
          status: 'success',
          message: `Success get data pic`,
          data: goQuery.rows,
          pagination: pagination,
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
      return;
    }
  },
  picDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await picModel.picDetailData(id);
      if (data.rowCount === 0) {
        const err = {
          message: `pic with id ${id} not found`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      success(res, {
        code: 200,
        status: 'success',
        message: `Success get pic pic id ${id}`,
        data: data.rows[0],
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
      return;
    }
  },
  picInsert: async (req, res) => {
    try {
      const { name, email, phoneNumber } = req.body;
      const nameCheck = await picModel.picNameCheck(name);
      if (nameCheck.rowCount > 0) {
        const err = {
          message: 'name is already exist',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      const emailCheck = await picModel.picEmailCheck(email);
      if (emailCheck.rowCount > 0) {
        const err = {
          message: 'email is already exist',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      const phoneNumberCheck = await picModel.picPhoneNumberCheck(phoneNumber);
      if (phoneNumberCheck.rowCount > 0) {
        const err = {
          message: 'phone number is already exist',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      // insert data
      const id = uuidv4();
      const isActive = 1;
      const data = {
        id,
        name,
        email,
        phoneNumber,
        isActive,
      };
      await picModel.picInsertData(data);
      success(res, {
        code: 200,
        status: 'success',
        message: 'create pic success',
        data: data,
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
      return;
    }
  },
  picUpdate: async (req, res) => {
    try {
      const id = req.params.id;
      const picData = await picModel.picDetailData(id);
      if (picData.rowCount == 0) {
        const err = {
          message: `Pic with id ${id} not found`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      const { name, email, phoneNumber } = req.body;
      console.log(picData.rows[0]);
      if (name != picData.rows[0].name) {
        const picNameCheck = await picModel.picNameCheck(name);
        if (picNameCheck.rowCount > 0) {
          const err = {
            message: 'Name is already exist',
          };
          failed(res, {
            code: 500,
            status: 'error',
            message: err.message,
            error: [],
          });
          return;
        }
      }
      if (email != picData.rows[0].email) {
        const picEmailCheck = await picModel.picEmailCheck(email);
        if (picEmailCheck.rowCount > 0) {
          const err = {
            message: 'Email is already exist',
          };
          failed(res, {
            code: 500,
            status: 'error',
            message: err.message,
            error: [],
          });
          return;
        }
      }
      if (phoneNumber != picData.rows[0].phone_number) {
        const picPhoneNumberCheck = await picModel.picPhoneNumberCheck(
          phoneNumber
        );
        if (picPhoneNumberCheck.rowCount > 0) {
          const err = {
            message: 'phone number is already exist',
          };
          failed(res, {
            code: 500,
            status: 'error',
            message: err.message,
            error: [],
          });
          return;
        }
      }
      const date = new Date();
      const dateOffset = new Date(
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
      );
      const updateAt = dateOffset.toISOString();
      const data = {
        id,
        name,
        email,
        phoneNumber,
        updateAt,
      };
      await picModel.picUpdateData(data);
      success(res, {
        code: 200,
        status: 'success',
        message: `update pic id ${id} success`,
        data: data,
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
      return;
    }
  },
  picMode: async (req, res) => {
    try {
      const id = req.params.id;
      const { isActive } = req.body;
      const date = new Date();
      const dtOffset = new Date(
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
      );
      const deletedAt = dtOffset.toISOString();
      const data = {
        id,
        isActive,
        deletedAt,
      };
      const active = await picModel.picDetailData(id);
      if (active.rowCount === 0) {
        const err = {
          message: `id ${id} not found`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      if (isActive == 1 && active.rows[0].is_active == 1) {
        const err = {
          message: `pic with id ${id} is already active`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      if (isActive == 0 && active.rows[0].is_active == 0) {
        const err = {
          message: `pic with id ${id} is already nonactive`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      await picModel.picModeData(data);
      success(res, {
        code: 200,
        status: 'success',
        message: `update mode pic id ${id} success`,
        data: data,
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
      return;
    }
  },
};
