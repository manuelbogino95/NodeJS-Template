const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const router = require('./routes');
const mongooseConnection = require('./db');
const { errorHandlerMiddleware } = require('./middlewares');

// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.config();

// Create Express server.
const app = express();
const port = process.env.PORT;

// Connect to MongoDB.
mongooseConnection();

// Express configuration.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(router);

app.use(errorHandlerMiddleware);

// Start Express server.
app.listen(port, () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), port, app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
