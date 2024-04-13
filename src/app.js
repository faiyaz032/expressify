//dependencies
const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');
const cors = require('cors');
const defineGlobalErrorHandler = require('./middlewares/defineGlobalErrorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
const defineMetrics = require('./libraries/utils/defineMetrics');
const logger = require('./libraries/logger/LoggerManager');
const requestLogger = require('./middlewares/requestLogger');
const addRequestId = require('./middlewares/addRequestId');
const initializeModules = require('./modules');

const initializeApp = (expressApp) => {
  logger.info('Initializing app...');
  dotenv.config();

  //enable middlewares
  expressApp.use(cors());
  expressApp.use(helmet());
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json());

  expressApp.use(requestLogger);
  expressApp.use(addRequestId);

  defineMetrics(expressApp);

  const router = express.Router();

  initializeModules(router);

  expressApp.use('/api/v1', router);

  //health check route
  expressApp.get('/health', (req, res) => {
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Server is healthy',
    });
  });

  expressApp.all('*', notFoundHandler);
  defineGlobalErrorHandler(expressApp);
};

module.exports = initializeApp;
