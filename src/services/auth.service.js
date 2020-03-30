const bcrypt = require('bcrypt');
const User = require('../models');
const generateAuthToken = require('../helpers');

const createUser = async user => {
  const userModel = new User(user);

  if (userModel.isModified('password')) {
    await userModel.validate();
    userModel.password = await bcrypt.hash(user.password, 8);
  }

  const token = await generateAuthToken(userModel.id);

  await userModel.save();
  return token;
};

const findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  const token = await generateAuthToken(user.id);
  return token;
};

const getUserById = async id => {
  const user = await User.findOne({ _id: id });
  const userObject = user.toObject();

  delete userObject.password;

  if (!user) throw new Error('No user found');

  return userObject;
};

module.exports = {
  createUser,
  findByCredentials,
  getUserById,
};
