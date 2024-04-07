const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const initializeApp = require('./app');

let connection;

const createExpressApp = () => {
  const expressApp = express();
  expressApp.use(cors());
  expressApp.use(helmet());
  dotenv.config();
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json());

  initializeApp(expressApp);

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
      console.log(connection.address());
      resolve(connection.address());
    });
  });
};

module.exports = { createExpressApp, startServer, stopServer };
