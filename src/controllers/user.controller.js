const { userService } = require('../services');

const getUserHandler = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.userId);

    res.send(user);
  } catch (error) {
    next(error);
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

const deleteUserHandler = async (req, res, next) => {
  try {
    await userService.deleteUser(req.userId);

    res.send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserHandler,
  patchProfileUpdateHandler,
  deleteUserHandler,
};
