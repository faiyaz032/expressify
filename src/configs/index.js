const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const logger = require('../shared/logger/LoggerManager');
const AppError = require('../shared/error-handling/AppError');
const { StatusCodes } = require('http-status-codes');

class Config {
  constructor() {
    this.env = process.env.NODE_ENV.trim() || 'development';
    this.loadEnvFile();
    this.config = this.loadConfig();
  }

  loadEnvFile() {
    const envFilePath = path.resolve(__dirname, `../../.env.${this.env}`);
    dotenv.config({ path: envFilePath });
  }

  loadConfig() {
    const filePath = path.resolve(__dirname, `${this.env}.js`);

    if (!fs.existsSync(filePath)) {
      const errorMessage = `Configuration file for '${this.env}' environment not found.`;
      logger.error(errorMessage);
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, errorMessage);
    }

    try {
      const configs = require(filePath);
      logger.info(
        `Configuration file for '${this.env}' environment loaded successfully.`
      );
      return configs;
    } catch (error) {
      const errorMessage = `Error loading configuration file for '${this.env}' environment : ${error.message}`;
      logger.error(errorMessage);
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, errorMessage);
    }
  }

  get(key) {
    if (!this.config.hasOwnProperty(key)) {
      const errorMessage = `The '${key}' is not available in '${this.env}' configuration file`;
      logger.error(errorMessage);
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, errorMessage);
    }
    return this.config[key];
  }
}

const config = new Config();

module.exports = config;
