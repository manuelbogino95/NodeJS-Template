const bcrypt = require('bcrypt');
const httpStatus = require('http-status-codes');
const User = require('../models');
const { jwt } = require('../helpers');
const { CustomError } = require('../helpers');
const emailService = require('./email.service');

const createUser = async user => {
  const userModel = new User(user);

  if (userModel.isModified('password')) {
    await userModel.validate();
    userModel.password = await bcrypt.hash(user.password, 8);
  }

  const token = await jwt.generateAuthToken(userModel.id);

  await userModel.save();

  emailService.sendEmail(
    userModel.email,
    'Thanks for joining in!',
    `Welcome to the app, ${userModel.name}. Let me know how you get along with the app.`
  );

  return token;
};

const findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError('INCORRECT_CREDENTIALS', httpStatus.NOT_FOUND, 'The email or the password is not valid');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new CustomError('INCORRECT_CREDENTIALS', httpStatus.NOT_FOUND, 'The email or the password is not valid');
  }

  const token = await jwt.generateAuthToken(user.id);
  return token;
};

module.exports = {
  createUser,
  findByCredentials,
};
