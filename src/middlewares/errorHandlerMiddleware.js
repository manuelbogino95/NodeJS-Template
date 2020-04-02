const httpStatus = require('http-status-codes');
const { CustomError } = require('../helpers');

const errorHandlerMiddleware = (error, req, res, next) => {
  if (error instanceof CustomError) {
    /* 
    In case the error has already been handled, we just transform the error 
    to our return object.
    */

    return res.status(error.status).send({
      error: error.code,
      description: error.message,
    });
  }

  console.error(error); // For debugging reasons

  // It would be an unhandled error, here we can just return our generic error object.
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'GENERIC',
    description: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR),
  });
};

module.exports = errorHandlerMiddleware;
