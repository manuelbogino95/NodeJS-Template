const jwt = require('jsonwebtoken');

const generateAuthToken = async id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });

module.exports = generateAuthToken;
