const mongoose = require('mongoose');
const chalk = require('chalk');

const mongooseConnection = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  mongoose.connection.on('error', err => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
  });

  mongoose.connection.once('open', () => {
    console.log('%s MongoDB connected', chalk.green('✓'));
  });
};

module.exports = mongooseConnection;
