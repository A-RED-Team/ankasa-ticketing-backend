const countryModel = require('../models/country.model');
const { success, failed } = require('../helpers/response');
const { v4: uuidv4 } = require('uuid');

const countryController = {
  getAllCountry: async (req, res) => {
    try {
      let { sortField, sortType, page, limit, search } = req.query;
      page = Number(page);
      limit = Number(limit);
      const getSearch = !search ? '' : search;
      const sortByField = !sortField ? 'name' : sortField;
      const sortByType =
        sortType === 'ASC' || sortType === 'DESC' ? sortType : 'ASC';
      const getPage = !page ? 1 : page;
      const getLimit = !limit ? 10 : limit;
      const offset = (getPage - 1) * getLimit;
      const allData = await countryModel.getCountCountry();
      const totalData = Number(allData.rows[0].totalcountry);
      const result = await countryModel.getAllCountry(
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
          message: 'Get all country success',
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
          code: 201,
          status: 'Success',
          message: 'Get all country success',
          data: result.rows,
          pagination,
        });
      }
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Failed',
        error: err.message,
      });
    }
  },
  getDetailCountry: async (req, res) => {
    try {
      const id = req.params.countryId;
      const result = await countryModel.getDetailCountry(id);
      if (result.rowCount === 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: `Data country with id ${id} not found`,
          error: null,
        });
        return;
      }
      success(res, {
        code: 200,
        status: 'Success',
        message: 'Get detail country success',
        data: result.rows,
      });
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Failed',
        error: err.message,
      });
    }
  },
  insertCountry: async (req, res) => {
    try {
      const id = uuidv4();
      const { nameCountry, aliasCountry } = req.body;
      const result = await countryModel.insertCountry(
        id,
        nameCountry,
        aliasCountry
      );
      success(res, {
        code: 200,
        status: 'Success',
        message: 'Insert country success',
        data: req.body,
      });
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Insert country failed',
        error: err.message,
      });
    }
  },
  updateCountry: async (req, res) => {
    try {
      const id = req.params.countryId;
      const { nameCountry, aliasCountry } = req.body;
      const result = await countryModel.updateCountry(
        id,
        nameCountry,
        aliasCountry
      );
      if (result.rowCount === 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: `Country with Id ${flightId} not found`,
          error: null,
        });
        return;
      }
      success(res, {
        code: 200,
        status: 'Success',
        message: 'Update country with  success',
        data: req.body,
      });
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Failed update country',
        error: err.message,
      });
    }
  },
  countryNonActive: async (req, res) => {
    try {
      const id = req.params.countryId;
      const { isActive } = req.body;
      if (isActive === '0') {
        const result = await countryModel.countryNonActive(id);
        if (result.rowCount === 0) {
          failed(res, {
            code: 400,
            status: 'Error',
            message: `Country with Id ${id} not found`,
            error: null,
          });
          return;
        }
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Delete country success',
          data: req.body,
        });
      } else {
        const result = await countryModel.countryActive(id);
        if (result.rowCount === 0) {
          failed(res, {
            code: 400,
            status: 'Error',
            message: `Country with Id ${id} not found`,
            error: null,
          });
          return;
        }
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Country active success',
          data: req.body,
        });
      }
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Failed delete country',
        error: err.message,
      });
    }
  },
};

module.exports = countryController;
