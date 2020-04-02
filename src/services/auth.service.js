const bcrypt = require('bcrypt');
const httpStatus = require('http-status-codes');
const User = require('../models');
const { jwt } = require('../helpers');
const { CustomError } = require('../helpers');

const createUser = async user => {
  const userModel = new User(user);

  if (userModel.isModified('password')) {
    await userModel.validate();
    userModel.password = await bcrypt.hash(user.password, 8);
  }

  const token = await jwt.generateAuthToken(userModel.id);

  await userModel.save();
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

const getUserById = async id => {
  const user = await User.findOne({ _id: id });

  if (!user) throw new CustomError('USER_NOT_FOUND', httpStatus.NOT_FOUND, 'The user could not be found');

  return user;
};

const updateUser = async (fields, userId) => {
  const updates = Object.keys(fields);
  const allowedFields = ['name', 'email'];
  const isValidOperation = updates.every(update => allowedFields.includes(update));

  if (!isValidOperation) throw new CustomError('INVALID_UPDATES', httpStatus.BAD_REQUEST, 'Invalid updates fields');

  const user = await getUserById(userId);

  updates.forEach(update => {
    user[update] = fields[update];
  });

  await user.save();

  return user;
};

module.exports = {
  createUser,
  findByCredentials,
  getUserById,
  updateUser,
};
