const { success, failed } = require('../helpers/response');

const { v4: uuidv4 } = require('uuid');

const deleteFile = require('../utils/deleteFile');

const airlinesModel = require('../models/airlines.model');

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
        console.log(pagination);
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
      const image = req.file.filename;
      const isActive = 1;
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
      let image;
      const airlinesData = await airlinesModel.airlinesDetailData(id);
      const airlinesNameCheck = await airlinesModel.airlinesNameCheck(name);
      // airlines name check
      if (name != airlinesData.rows[0].name) {
        if (airlinesNameCheck.rowCount > 0) {
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
      if (req.file) {
        image = req.file.filename;
        deleteFile(`public/uploads/airlines/${airlinesData.rows[0].image}`);
      } else {
        image = airlinesData.rows[0].image;
      }
      const updateAt = new Date().toISOString();
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
      const deletedAt = new Date().toISOString();
      const data = {
        id,
        isActive,
        deletedAt,
      };
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
        message: `update mode airlines id ${id} success`,
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
