const httpStatus = require('http-status-codes');
const { CustomError } = require('../helpers');
const User = require('../models');

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

const deleteUser = async id => {
  const user = await User.deleteOne({ _id: id });

  return user;
};

module.exports = {
  getUserById,
  updateUser,
  deleteUser,
};
