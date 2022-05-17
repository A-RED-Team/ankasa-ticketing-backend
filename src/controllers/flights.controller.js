// itis flights controllersss

const { success, failed } = require('../helpers/response');

const { v4: uuidv4 } = require('uuid');

const flightsModel = require('../models/flights.model');

module.exports = {
  flightsAll: async (req, res) => {
    try {
      const {
        departureCity,
        arrivalCity,
        type,
        flightClass,
        departureDate,
        child,
        adult,
        airlinesName,
        luggage,
        meal,
        wifi,
        direct,
        transit,
        moreTransit,
        departureTimeFrom,
        departureTimeTo,
        arrivedTimeFrom,
        arrivedTimeTo,
        priceFrom,
        priceTo,
        field,
        search,
        page,
        limit,
        sort,
        mode,
      } = req.query;
      const departureCityQuery = departureCity || '';
      const arrivalCityQuery = arrivalCity || '';
      const typeQuery = type || '';
      const flightClassQuery = flightClass || '';
      const departureDateQuery = departureDate || '';
      const childQuery = child || 0;
      const adultQuery = adult || 0;
      const airlinesNameQuery = airlinesName || '';
      const luggageQuery = luggage || '';
      const mealQuery = meal || '';
      const wifiQuery = wifi || '';
      const directQuery = direct || '';
      const transitQuery = transit || '';
      const moreTransitQuery = moreTransit || '';
      const departureTimeFromQuery = departureTimeFrom || '00:00:00';
      const departureTimeToQuery = departureTimeTo || '24:00:00';
      const arrivedTimeFromQuery = arrivedTimeFrom || '00:00:00';
      const arrivedTimeToQuery = arrivedTimeTo || '24:00:00';
      const priceFromQuery = priceFrom || 0;
      const priceToQuery = priceTo || 9999;
      const searchQuery = search || '';
      const fieldQuery = field || 'airlines.name';
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 10;
      const offsetValue = (pageValue - 1) * limitValue;
      const sortQuery = sort ? sort : 'airlines.name';
      const modeQuery = mode ? mode : 'ASC';
      const allData = await flightsModel.allData();
      const totalData = Number(allData.rows[0].total);
      const data = {
        departureCityQuery,
        arrivalCityQuery,
        typeQuery,
        flightClassQuery,
        departureDateQuery,
        childQuery,
        adultQuery,
        airlinesNameQuery,
        luggageQuery,
        mealQuery,
        wifiQuery,
        directQuery,
        transitQuery,
        moreTransitQuery,
        departureTimeFromQuery,
        departureTimeToQuery,
        arrivedTimeFromQuery,
        arrivedTimeToQuery,
        priceFromQuery,
        priceToQuery,
        fieldQuery,
        searchQuery,
        offsetValue,
        limitValue,
        sortQuery,
        modeQuery,
      };
      const goQuery = await flightsModel.flightsAllData(data);
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
          message: `Success get data flights`,
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
          message: `Success get data flights`,
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
  flightsDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await flightsModel.flightsDetailData(id);
      if (data.rowCount === 0) {
        const err = {
          message: `Flights with id ${id} not found`,
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
        message: `Success get flights with id ${id}`,
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
  flightsInsert: async (req, res) => {
    try {
      const {
        airlineId,
        departureCity,
        arrivalCity,
        departureTime,
        arrivalTime,
        code,
        classs,
        type,
        departureDate,
        adult,
        child,
        direct,
        transit,
        moreTransit,
        luggage,
        meal,
        wifi,
        price,
        idPic,
      } = req.body;

      // for check direct transit and moreTransit
      if (direct == 1 && transit == 1 && moreTransit == 1) {
        const err = {
          message:
            'if direct is 1 then transit and moreTransit must be 0 and vice versa too',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      } else if (direct == 1 && transit == 1 && moreTransit == 0) {
        const err = {
          message: 'if direct is 1 then transit must be 0 and vice versa too',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      } else if (direct == 1 && transit == 0 && moreTransit == 1) {
        const err = {
          message:
            'if direct is 1 then more transit must be 0 and vice versa too',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      } else if (direct == 0 && transit == 1 && moreTransit == 1) {
        const err = {
          message:
            'if transit is 1 then more transit must be 0 and vice versa too',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      // for check status airline active

      // for check airlinesId input
      const airlinesIdCheck = await flightsModel.checkAirlinesId(airlineId);
      if (airlinesIdCheck.rowCount == 0) {
        const err = {
          message: `no airline found with id ${airlineId}`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      // for check airlines is active
      if (airlinesIdCheck.rows[0].is_active == 0) {
        const err = {
          message: `airline with id ${airlineId} is non active`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      //check departureCity === arrivalCity
      if (departureCity == arrivalCity) {
        const err = {
          message: `departureCity and arrivalCity cannot be same`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      // for check departureCity Input
      const departureCityCheck = await flightsModel.checkAirlinesCities(
        departureCity
      );
      if ((departureCityCheck.rowCount = 0)) {
        const err = {
          message: `no cities found with id ${departureCity}`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      // for check departure city is active
      if (departureCityCheck.rows[0].is_active == 0) {
        const err = {
          message: `city with id ${departureCity} is non active`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      // for check arrivalCity Input
      const arrivalCityCheck = await flightsModel.checkAirlinesCities(
        arrivalCity
      );
      if (arrivalCityCheck.rowCount == 0) {
        const err = {
          message: `no cities found with id ${arrivalCity}`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      // for check arrival city is active
      if (arrivalCityCheck.rows[0].is_active == 0) {
        const err = {
          message: `city with id ${arrivalCity} is non active`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      const codeCheck = await flightsModel.codeCheckFlight(code);
      if (codeCheck.rowCount > 0) {
        const err = {
          message: `flight with code ${code} is already exist`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      // for check idPic input
      const idPicCheck = await flightsModel.checkPicId(idPic);
      if (idPicCheck.rowCount == 0) {
        const err = {
          message: `no pic found with id ${idPic}`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      // for check pic is active
      if (idPicCheck.rows[0].is_active == 0) {
        const err = {
          message: `pic with id ${idPic} is non active`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      // catch all data
      const id = uuidv4();
      const stock = adult + child;
      const isActive = 1;
      const rating = 0;
      const totalReviewed = 0;
      const data = {
        id,
        airlineId,
        departureCity,
        arrivalCity,
        departureTime,
        arrivalTime,
        code,
        classs,
        type,
        departureDate,
        adult,
        child,
        direct,
        transit,
        moreTransit,
        luggage,
        meal,
        wifi,
        price,
        stock,
        rating,
        totalReviewed,
        idPic,
        isActive,
      };
      await flightsModel.flightsInsertData(data);
      success(res, {
        code: 200,
        status: 'success',
        message: 'create flights success',
        data: data,
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
  flightsUpdate: async (req, res) => {
    try {
      const id = req.params.id;
      const {
        airlineId,
        departureCity,
        arrivalCity,
        departureTime,
        arrivalTime,
        code,
        classs,
        type,
        departureDate,
        adult,
        child,
        direct,
        transit,
        moreTransit,
        luggage,
        meal,
        wifi,
        price,
        idPic,
      } = req.body;

      // for check direct transit and moreTransit
      if (direct == 1 && transit == 1 && moreTransit == 1) {
        const err = {
          message:
            'if direct is 1 then transit and moreTransit must be 0 and vice versa too',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      } else if (direct == 1 && transit == 1 && moreTransit == 0) {
        const err = {
          message: 'if direct is 1 then transit must be 0 and vice versa too',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      } else if (direct == 1 && transit == 0 && moreTransit == 1) {
        const err = {
          message:
            'if direct is 1 then more transit must be 0 and vice versa too',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      } else if (direct == 0 && transit == 1 && moreTransit == 1) {
        const err = {
          message:
            'if transit is 1 then more transit must be 0 and vice versa too',
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      // for check airlinesId input
      const airlinesIdCheck = await flightsModel.checkAirlinesId(airlineId);
      if (airlinesIdCheck.rowCount == 0) {
        const err = {
          message: `no airline found with id ${airlineId}`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      // for check airlines is active
      if (airlinesIdCheck.rows[0].is_active == 0) {
        const err = {
          message: `airline with id ${airlineId} is non active`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      //check departureCity === arrivalCity
      if (departureCity == arrivalCity) {
        const err = {
          message: `departureCity and arrivalCity cannot be same`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      // for check departureCity Input
      const departureCityCheck = await flightsModel.checkAirlinesCities(
        departureCity
      );
      if ((departureCityCheck.rowCount = 0)) {
        const err = {
          message: `no cities found with id ${departureCity}`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      // for check departure city is active
      if (departureCityCheck.rows[0].is_active == 0) {
        const err = {
          message: `city with id ${departureCity} is non active`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      // for check arrivalCity Input
      const arrivalCityCheck = await flightsModel.checkAirlinesCities(
        arrivalCity
      );
      if (arrivalCityCheck.rowCount == 0) {
        const err = {
          message: `no cities found with id ${arrivalCity}`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      // for check arrival city is active
      if (arrivalCityCheck.rows[0].is_active == 0) {
        const err = {
          message: `city with id ${arrivalCity} is non active`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      const flightsDetail = await flightsModel.flightsDetailData(id);
      const flightsCodeCheck = await flightsModel.flightsCodeCheck(code);

      // check id flights
      if (flightsDetail.rowCount == 0) {
        const err = {
          message: `Flights with id ${id} not found`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      // flights code check
      if (code != flightsDetail.rows[0].code) {
        if (flightsCodeCheck.rowCount > 0) {
          const err = {
            message: 'Code is already exist',
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

      // for check pic is active
      const idPicCheck = await flightsModel.checkPicId(idPic);
      if (idPicCheck.rows[0].is_active == 0) {
        const err = {
          message: `pic with id ${idPic} is non active`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }

      const date = new Date();
      const dateOffset = new Date(
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
      );
      const updateAt = dateOffset.toISOString();

      const stock = adult + child;
      const data = {
        id,
        airlineId,
        departureCity,
        arrivalCity,
        departureTime,
        arrivalTime,
        code,
        classs,
        type,
        departureDate,
        adult,
        child,
        direct,
        transit,
        moreTransit,
        luggage,
        meal,
        wifi,
        price,
        stock,
        idPic,
        updateAt,
      };
      await flightsModel.flightsUpdateData(data);
      success(res, {
        code: 200,
        status: 'success',
        message: `update flights with id ${id} success`,
        data: data,
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
  flightsMode: async (req, res) => {
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
      const active = await flightsModel.flightsDetailData(id);
      if (isActive == 1 && active.rows[0].is_active == 1) {
        const err = {
          message: `flights with id ${id} is already active`,
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
          message: `flights with id ${id} is already nonactive`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      const flightsMode = await flightsModel.flightsModeData(data);
      if (flightsMode.rowCount === 0) {
        const err = {
          message: `flights with id ${id} not found`,
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
        message: `update mode flights with id ${id} success`,
        data: data,
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
  flightsDelete: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await flightsModel.flightsDetailData(id);
      if (data.rows[0].is_active) {
        const err = {
          message: `set flight status inactive first`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      const flightsDelete = await flightsModel.flightsDeleteData(id);
      if (flightsDelete.rowCount === 0) {
        const err = {
          message: `flights with ${id} not found`,
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
        message: `delete flights with id ${id} success`,
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
  flightsActive: async (req, res) => {
    try {
      const {
        departureCity,
        arrivalCity,
        type,
        flightClass,
        departureDate,
        child,
        adult,
        airlinesName,
        luggage,
        meal,
        wifi,
        direct,
        transit,
        moreTransit,
        departureTimeFrom,
        departureTimeTo,
        arrivedTimeFrom,
        arrivedTimeTo,
        priceFrom,
        priceTo,
        field,
        search,
        page,
        limit,
        sort,
        mode,
      } = req.query;
      const departureCityQuery = departureCity || '';
      const arrivalCityQuery = arrivalCity || '';
      const typeQuery = type || '';
      const flightClassQuery = flightClass || '';
      const departureDateQuery = departureDate || '';
      const childQuery = child || 0;
      const adultQuery = adult || 0;
      const airlinesNameQuery = airlinesName || '';
      const luggageQuery = luggage || '';
      const mealQuery = meal || '';
      const wifiQuery = wifi || '';
      const directQuery = direct || '';
      const transitQuery = transit || '';
      const moreTransitQuery = moreTransit || '';
      const departureTimeFromQuery = departureTimeFrom || '00:00:00';
      const departureTimeToQuery = departureTimeTo || '24:00:00';
      const arrivedTimeFromQuery = arrivedTimeFrom || '00:00:00';
      const arrivedTimeToQuery = arrivedTimeTo || '24:00:00';
      const priceFromQuery = priceFrom || 0;
      const priceToQuery = priceTo || 9999;
      const searchQuery = search || '';
      const fieldQuery = field || 'airlines.name';
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 10;
      const offsetValue = (pageValue - 1) * limitValue;
      const sortQuery = sort ? sort : 'airlines.name';
      const modeQuery = mode ? mode : 'ASC';
      const allData = await flightsModel.allData();
      const totalData = Number(allData.rows[0].total);
      const data = {
        departureCityQuery,
        arrivalCityQuery,
        typeQuery,
        flightClassQuery,
        departureDateQuery,
        childQuery,
        adultQuery,
        airlinesNameQuery,
        luggageQuery,
        mealQuery,
        wifiQuery,
        directQuery,
        transitQuery,
        moreTransitQuery,
        departureTimeFromQuery,
        departureTimeToQuery,
        arrivedTimeFromQuery,
        arrivedTimeToQuery,
        priceFromQuery,
        priceToQuery,
        fieldQuery,
        searchQuery,
        offsetValue,
        limitValue,
        sortQuery,
        modeQuery,
      };
      const goQuery = await flightsModel.flightsActiveData(data);
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
          message: `Success get data flights`,
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
          message: `Success get data flights`,
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
};
