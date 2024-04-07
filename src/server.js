const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');
const cors = require('cors');
const initializeApp = require('./app');
const errorHandler = require('./libraries/error-handling');

let connection;

const createExpressApp = () => {
  const expressApp = express();
  expressApp.use(cors());
  expressApp.use(helmet());
  dotenv.config();
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json());

  initializeApp(expressApp);
  defineGlobalErrorHandler(expressApp);

  return expressApp;
};

const startServer = async () => {
  const expressApp = createExpressApp();
  const server = await openConnection(expressApp);

  console.log(`Server is running on ${server.address}:${server.port}`);
};

async function stopServer() {
  return new Promise((resolve) => {
    if (connection !== undefined) {
      connection.close(() => {
        resolve();
      });
    }
  });
}

const openConnection = async (expressApp) => {
  return new Promise((resolve, reject) => {
    const PORT = process.env.PORT || 8008;

    connection = expressApp.listen(PORT, () => {
      errorHandler.listenToErrorEvents(connection);
      resolve(connection.address());
    });
  });
};

const defineGlobalErrorHandler = (expressApp) => {
  expressApp.use((error, req, res, next) => {
    if (error && typeof error === 'object') {
      if (error.operational === undefined || error.operational === null) {
        error.operational = true;
      }
    }
    console.error('error', error);
    errorHandler.handleError(error);

    res.status(error?.statusCode || 500).json({
      success: error.success || false,
      statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      operational: error.operational,
      stack: error.stack,
    });
  });
};

module.exports = { createExpressApp, startServer, stopServer };
