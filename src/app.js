const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const defineGlobalErrorHandler = require('./middlewares/defineGlobalErrorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
const defineMetrics = require('./shared/utils/defineMetrics');
const requestLogger = require('./middlewares/requestLogger');
const addRequestId = require('./middlewares/addRequestId');
const logger = require('./shared/logger/LoggerManager');
const initializeCoreModules = require('./modules');

class AppFactory {
  static createApp() {
    logger.info('Creating app...');
    const app = express();
    dotenv.config();

    // Enable middlewares
    app.use(cors());
    app.use(helmet());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(requestLogger);
    app.use(addRequestId);

    defineMetrics(app);

    const router = express.Router();

    initializeCoreModules(router);

    app.use('/api/v1', router);

    // Health check route
    app.get('/health', (req, res) => {
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Server is healthy',
      });
    });

    app.all('*', notFoundHandler);
    defineGlobalErrorHandler(app);

    return app;
  }
}

module.exports = AppFactory;
