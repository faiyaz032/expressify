const { StatusCodes } = require('http-status-codes');
const AppError = require('../shared/error-handling/AppError');
const logger = require('../shared/logger/LoggerManager');
const _developmentConfigs = require('./development');
const _productionConfigs = require('./production');

let _configsToUse;

if (process.env.NODE_ENV.trim() === 'development') {
  _configsToUse = _developmentConfigs;
}

if (process.env.NODE_ENV.trim() === 'production') {
  _configsToUse = _productionConfigs;
}

const config = {
  get(key) {
    if (!_configsToUse[key]) {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `The ${key} is not available in ${process.env.NODE_ENV.trim()} configuration file`
      );
    }
    return _configsToUse[key];
  },
};

module.exports = config;
