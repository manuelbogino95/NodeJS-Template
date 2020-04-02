const httpStatus = require('http-status-codes');
const { CustomError } = require('../helpers');

const errorHandlerMiddleware = (error, req, res, next) => {
  if (error instanceof CustomError) {
    // In case the error has already been handled, we just transform the error to our return object.
    return res.status(error.status).send({
      error: error.code,
      description: error.message,
    });
  }

  // Handle Mongoose validations errors
  if (error.name === 'ValidationError') {
    const errors = [];
    const mongooseErrors = Object.values(error.errors);

    for (let i = 0; i < mongooseErrors.length; i += 1) {
      errors.push({
        field: mongooseErrors[i].path,
        message: mongooseErrors[i].message,
      });
    }

    return res.status(httpStatus.BAD_REQUEST).send({
      error: 'VALIDATION_ERROR',
      description: 'Fields validation failed',
      errors,
    });
  }

  // Handle Mongoose unique errors
  if (error.name === 'MongoError' && error.code === 11000) {
    const errorKey = Object.keys(error.keyValue);

    return res.status(httpStatus.BAD_REQUEST).send({
      error: 'DUPLICATE_KEY',
      description: `Property ${errorKey} already exists`,
    });
  }

  // For debugging reasons
  console.error(error);

  // It would be an unhandled error, here we can just return our generic error object.
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'GENERIC',
    description: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR),
  });
};

module.exports = errorHandlerMiddleware;
