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

  if (!user) throw new Error('No user found');

  return user;
};

const updateUser = async (fields, userId) => {
  const updates = Object.keys(fields);
  const allowedFields = ['name', 'email'];
  const isValidOperation = updates.every(update => allowedFields.includes(update));

  if (!isValidOperation) throw new Error('Error: invalid updates!');

  // const user = await User.findOne({ _id: userId });
  const user = await getUserById(userId);

  updates.forEach(update => {
    user[update] = fields[update];
  });

  await user.save();

  // eslint-disable-next-line no-underscore-dangle
  // delete user._doc.password;
  // console.log(user);
  return user;
};

module.exports = {
  createUser,
  findByCredentials,
  getUserById,
  updateUser,
};
