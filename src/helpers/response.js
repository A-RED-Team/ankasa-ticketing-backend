module.exports = {
  success: (res, payload) => {
    const {
      code,
      status,
      message,
      data,
      pagination = false,
      token = false,
    } = payload;

    const response = {
      code: code || 200,
      status: status || 'success',
      message,
      data,
    };

    // success with pagination
    if (pagination) {
      response.pagination = pagination;
    }

    // sucess with token
    if (token) {
      response.token = token;
      delete response.data;
    }

    res.status(code).json(response);

    // PENGGUNAAN
    /*
    success(res, {
      code: 200,
      status: success,
      message: 'create user sucesss',
      data: [],
      pagginatio: []
    })
    */
  },
  failed: (res, payload) => {
    const { code, status, message, error } = payload;

    const response = {
      code: code || 500,
      status: status || 'failed',
      message,
      error,
    };

    res.status(code).json(response);

    // PENGGUNAAN
    /*
    failed(res, {
      code: 400,
      status: error || failed,
      message: 'bad request',
      error: []
    })
    */
  },
};