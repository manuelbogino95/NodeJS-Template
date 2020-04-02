const jwt = require('jsonwebtoken');
const httpStatus = require('http-status-codes');
const { CustomError } = require('../helpers');

const authMiddleware = async (req, res, next) => {
  try {
    // check header or url parameters or post parameters for token
    if (!req.headers.authorization || !req.headers.authorization.split(' ')[0] === 'Bearer') {
      return next(
        new CustomError(httpStatus.getStatusText(httpStatus.FORBIDDEN), httpStatus.FORBIDDEN, 'No token provided')
      );
    }

    const token = req.headers.authorization.split(' ')[1];

    // verifies secret and checks exp
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    return next();
  } catch (error) {
    return next(
      new CustomError(httpStatus.getStatusText(httpStatus.UNAUTHORIZED), httpStatus.UNAUTHORIZED, 'Please autheticate')
    );
  }
};

module.exports = authMiddleware;
