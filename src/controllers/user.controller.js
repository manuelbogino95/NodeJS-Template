const { userService } = require('../services');

const getUserHandler = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.userId);

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

const patchProfileUpdateHandler = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.body, req.userId);

    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserHandler,
  patchProfileUpdateHandler,
};
