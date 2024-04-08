const express = require('express');
const { StatusCodes } = require('http-status-codes');
const initializeApp = require('./app');
const errorHandler = require('./libraries/error-handling');

let connection;

const createExpressApp = () => {
  const expressApp = express();

  initializeApp(expressApp);

  return expressApp;
};

const startServer = async () => {
  const expressApp = createExpressApp();
  const server = await openConnection(expressApp);

  console.log(`Server is alive on PORT:${server.port}`);
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

module.exports = { createExpressApp, startServer, stopServer };
