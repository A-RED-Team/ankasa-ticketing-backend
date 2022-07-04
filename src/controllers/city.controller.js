const cityModel = require('../models/city.model');
const { success, failed } = require('../helpers/response');
const { v4: uuidv4 } = require('uuid');
const deleteFile = require('../utils/deleteFile');
const uploadGoogleDrive = require('../utils/uploadGoogleDrive');
const deleteGoogleDrive = require('../utils/deleteGoogleDrive');

const cityController = {
  getAllCity: async (req, res) => {
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
      const allData = await cityModel.getCountCity();
      const totalData = Number(allData.rows[0].totalcity);
      const result = await cityModel.getAllCity(
        sortByField,
        sortByType,
        getLimit,
        offset,
        getSearch
      );
      if (result.rowCount == 0) {
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
          message: 'Get all city success',
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
          message: 'Get all city success',
          data: result.rows,
          pagination,
        });
      }
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Failed get all city',
        error: err.message,
      });
    }
  },
  getCityPublic: async (req, res) => {
    try {
      let { sortField, sortType, page, limit, search } = req.query;
      page = Number(page);
      limit = Number(limit);
      const getSearch = !search ? '' : search;
      const sortByField = !sortField ? 'cities.created_at' : sortField;
      const sortByType =
        sortType === 'ASC' || sortType === 'DESC' ? sortType : 'ASC';
      const getPage = !page ? 1 : page;
      const getLimit = !limit ? 5 : limit;
      const offset = (getPage - 1) * getLimit;
      const allData = await cityModel.getCountCityActive();
      const totalData = Number(allData.rows[0].totalcity);
      const result = await cityModel.cityPublic(
        sortByField,
        sortByType,
        getLimit,
        offset,
        getSearch
      );
      if (search) {
        const pagination = {
          currentPage: getPage,
          currentLimit: getLimit,
          totalPage: Math.ceil(result.rowCount / getLimit),
        };
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Get trending city success',
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
          message: 'Get trending city success',
          data: result.rows,
          pagination,
        });
      }
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Failed get trending city',
        error: err.message,
      });
    }
  },
  getDetailCity: async (req, res) => {
    try {
      const cityId = req.params.cityId;
      const result = await cityModel.getDetailCity(cityId);
      if (result.rowCount == 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: `City with Id ${cityId} not found`,
          error: null,
        });
        return;
      }
      success(res, {
        code: 200,
        status: 'Success',
        message: `Get detail city with id ${cityId}  success`,
        data: result.rows[0],
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
  insertCity: async (req, res) => {
    try {
      const id = uuidv4();
      const { countryId, cityName } = req.body;
      // const image = req.file.filename;
      if (!req.file) {
        failed(res, {
          code: 500,
          status: 'error',
          message: 'Image is required',
          error: null,
        });
        return;
      }
      const checkNameCity = await cityModel.checkNameCity(cityName);
      if (checkNameCity.rowCount > 0) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        failed(res, {
          code: 400,
          status: 'Error',
          message: 'Name city is already exist',
          error: null,
        });
        return;
      }
      // upload image to google drive
      let image = null;
      if (req.file) {
        // upload image to google drive
        const photoGd = await uploadGoogleDrive(req.file);
        image = photoGd.id;
        // remove image after upload
        deleteFile(req.file.path);
      }
      const result = await cityModel.insertCity(id, countryId, cityName, image);
      success(res, {
        code: 200,
        status: 'Success',
        message: 'Insert City success',
        data: result,
      });
    } catch (err) {
      if (req.file) {
        deleteFile(req.file.path);
      }
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Failed to insert city',
        error: err.message,
      });
    }
  },
  updateCity: async (req, res) => {
    try {
      const cityId = req.params.cityId;
      const { cityName } = req.body;
      const checkCityId = await cityModel.checkCityId(cityId);
      if (checkCityId.rowCount == 0) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        failed(res, {
          code: 400,
          status: 'Error',
          message: `City with Id ${cityId} not found`,
          error: null,
        });
        return;
      }
      const checkNameCity = await cityModel.checkNameCity(cityName);
      if (cityName != checkCityId.rows[0].name) {
        if (checkNameCity.rowCount > 0) {
          if (req.file) {
            deleteFile(req.file.path);
          }

          failed(res, {
            code: 400,
            status: 'Error',
            message: 'Name City is already exist',
            error: null,
          });
          return;
        }
      }

      // upload image to google drive
      let { image } = checkCityId.rows[0];
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

      const result = await cityModel.updateCity(cityId, cityName, image);
      success(res, {
        code: 200,
        status: 'Success',
        message: `Update city with id ${cityId} success`,
        data: result,
      });
    } catch (err) {
      if (req.file) {
        deleteFile(req.file.path);
      }

      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Failed to update city',
        error: err.message,
      });
    }
  },
  deleteCity: async (req, res) => {
    try {
      const cityId = req.params.cityId;
      const { isActive } = req.body;
      const checkCityId = await cityModel.checkCityId(cityId);
      if (checkCityId.rowCount == 0) {
        failed(res, {
          code: 400,
          status: 'Error',
          message: `City with Id ${cityId} not found`,
          error: null,
        });
        return;
      }
      if (checkCityId.rows[0].is_active == isActive) {
        if (isActive == '1') {
          failed(res, {
            code: 400,
            status: 'Error',
            message: `City with id ${cityId} have been active`,
            error: null,
          });
        } else {
          failed(res, {
            code: 400,
            status: 'Error',
            message: `City with id ${cityId} have been non active`,
            error: null,
          });
        }
        return;
      }
      if (isActive === '0') {
        const result = await cityModel.cityNonActive(cityId);
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Delete city success',
          data: req.body,
        });
      } else {
        const result = await cityModel.cityActive(cityId);
        success(res, {
          code: 200,
          status: 'Success',
          message: 'City active success',
          data: req.body,
        });
      }
    } catch (err) {
      failed(res, {
        code: 400,
        status: 'Error',
        message: 'Failed to delete city',
        error: err.message,
      });
    }
  },
};

module.exports = cityController;
