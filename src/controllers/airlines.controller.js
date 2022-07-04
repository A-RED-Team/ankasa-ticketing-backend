const { success, failed } = require('../helpers/response');
const { v4: uuidv4 } = require('uuid');
const deleteFile = require('../utils/deleteFile');
const airlinesModel = require('../models/airlines.model');
const uploadGoogleDrive = require('../utils/uploadGoogleDrive');
const deleteGoogleDrive = require('../utils/deleteGoogleDrive');

module.exports = {
  airlinesAll: async (req, res) => {
    try {
      const { search, page, limit, sort, mode } = req.query;
      const searchQuery = search || '';
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 5;
      const offsetValue = (pageValue - 1) * limitValue;
      const sortQuery = sort ? sort : 'name';
      const modeQuery = mode ? mode : 'ASC';
      const allData = await airlinesModel.allData();
      const totalData = Number(allData.rows[0].total);
      const data = {
        searchQuery,
        offsetValue,
        limitValue,
        sortQuery,
        modeQuery,
      };
      const goQuery = await airlinesModel.airlinesAllData(data);
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
          message: `Success get data airlines`,
          data: goQuery.rows,
          pagination: pagination,
        });
      } else {
        const pagination = {
          currentPage: pageValue,
          dataPerPage: limitValue,
          totalPage: Math.ceil(totalData / limitValue),
        };

        success(res, {
          code: 200,
          status: 'success',
          message: `Success get data airlines`,
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
  airlinesActive: async (req, res) => {
    try {
      const { search, page, limit, sort, mode } = req.query;
      const searchQuery = search || '';
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 5;
      const offsetValue = (pageValue - 1) * limitValue;
      const sortQuery = sort ? sort : 'name';
      const modeQuery = mode ? mode : 'ASC';
      const allData = await airlinesModel.allData();
      const totalData = Number(allData.rows[0].total);
      const data = {
        searchQuery,
        offsetValue,
        limitValue,
        sortQuery,
        modeQuery,
      };
      const goQuery = await airlinesModel.airlinesActiveData(data);
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
          message: `Success get data active airlines`,
          data: goQuery.rows,
          pagination: pagination,
        });
      } else {
        const pagination = {
          currentPage: pageValue,
          dataPerPage: limitValue,
          totalPage: Math.ceil(totalData / limitValue),
        };

        success(res, {
          code: 200,
          status: 'success',
          message: `Success get data active airlines`,
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
  airlinesDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await airlinesModel.airlinesDetailData(id);
      if (data.rowCount === 0) {
        const err = {
          message: `Airlines with id ${id} not found`,
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
        message: `Success get airlines with id ${id}`,
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
  airlinesInsert: async (req, res) => {
    try {
      const { name } = req.body;
      if (!req.file) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        const err = {
          message: 'Image is required',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      const airlinesNameCheck = await airlinesModel.airlinesNameCheck(name);
      if (airlinesNameCheck.rowCount > 0) {
        if (req.file) {
          deleteFile(req.file.path);
        }
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
      const id = uuidv4();
      // const image = req.file.filename;
      const isActive = 1;
      // upload image to google drive
      let image = null;
      if (req.file) {
        // upload image to google drive
        const photoGd = await uploadGoogleDrive(req.file);
        image = photoGd.id;
        // remove image after upload
        deleteFile(req.file.path);
      }
      // insert data
      const data = {
        id,
        name,
        image,
        isActive,
      };

      await airlinesModel.airlinesInsertData(data);
      success(res, {
        code: 200,
        status: 'success',
        message: 'create airlines success',
        data: data,
        paggination: [],
      });
    } catch (error) {
      if (req.file) {
        deleteFile(req.file.path);
      }
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
      return;
    }
  },
  airlinesUpdate: async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const airlinesData = await airlinesModel.airlinesDetailData(id);
      const airlinesNameCheck = await airlinesModel.airlinesNameCheck(name);
      // check id
      const checkId = await airlinesModel.airlinesDetailData(id);
      if (checkId.rowCount === 0) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        const err = {
          message: `Airlines with id ${id} not found`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      // airlines name check
      if (name != airlinesData.rows[0].name) {
        if (airlinesNameCheck.rowCount > 0) {
          if (req.file) {
            deleteFile(req.file.path);
          }
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
      // upload image to google drive
      let { image } = airlinesData.rows[0];
      if (req.file) {
        if (image) {
          // remove old image except default image
          deleteGoogleDrive(image);
        }
        // upload new image to google drive
        const photoGd = await uploadGoogleDrive(req.file);
        image = photoGd.id;
        // remove image after upload
        deleteFile(req.file.path);
      }
      const date = new Date();
      const dateOffset = new Date(
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
      );
      const updateAt = dateOffset.toISOString();
      const data = {
        id,
        name,
        updateAt,
        image,
      };

      await airlinesModel.airlinesUpdateData(data);
      success(res, {
        code: 200,
        status: 'success',
        message: `update airlines id ${id} success`,
        data: data,
        paggination: [],
      });
    } catch (error) {
      if (req.file) {
        deleteFile(req.file.path);
      }
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
      return;
    }
  },
  airlinesMode: async (req, res) => {
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

      const active = await airlinesModel.airlinesDetailData(id);
      if (isActive == 1 && active.rows[0].is_active == 1) {
        const err = {
          message: `airline with id ${id} is already active`,
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
          message: `airline with id ${id} is already nonactive`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      const mode = await airlinesModel.airlinesModeData(data);
      if (mode.rowCount === 0) {
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
      success(res, {
        code: 200,
        status: 'success',
        message: `update status airlines id ${id} success`,
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
  airlinesDelete: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await airlinesModel.airlinesDetailData(id);
      if (data.rows[0].is_active) {
        const err = {
          message: `set airline status inactive first`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      const airlinesDelete = await airlinesModel.airlinesDeleteData(id);
      if (airlinesDelete.rowCount === 0) {
        const err = {
          message: `airlines with ${id} not found`,
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
        message: `delete airlines with id ${id} success`,
        data: data.rows[0],
        paggination: [],
      });
    } catch (err) {
      failed(res, {
        code: 500,
        status: 'error',
        message: err.message,
        error: [],
      });
      return;
    }
  },
};
