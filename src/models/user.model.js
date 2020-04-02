const mongoose = require('mongoose');
const validator = require('validator');
const httpStatus = require('http-status-codes');
const { CustomError } = require('../helpers');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new CustomError('INVALID_EMAIL', httpStatus.BAD_REQUEST);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function toJson() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
