const httpStatus = require('http-status-codes');
const { authService } = require('../services');

const postSigninHandler = async (req, res, next) => {
  try {
    const token = await authService.findByCredentials(req.body.email, req.body.password);

    res.send({ token });
  } catch (error) {
    next(error);
  }
};

const postSignupHandler = async (req, res, next) => {
  const user = { ...req.body };

  try {
    const token = await authService.createUser(user);

    res.status(httpStatus.CREATED).send({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postSigninHandler,
  postSignupHandler,
};
