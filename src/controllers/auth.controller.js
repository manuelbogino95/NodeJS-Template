const authService = require('../services');

const postSigninHandler = async (req, res) => {
  try {
    const token = await authService.findByCredentials(req.body.email, req.body.password);
    return res.send({ token });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const postSignupHandler = async (req, res) => {
  const user = { ...req.body };

  try {
    const token = await authService.createUser(user);

    return res.status(201).send({ token });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getUserHandler = async (req, res) => {
  try {
    const user = await authService.getUserById(req.userId);
    res.send(user);
  } catch (error) {
    res.status(500).send('There was a problem finding the user.');
  }
};

module.exports = {
  postSigninHandler,
  postSignupHandler,
  getUserHandler,
};
