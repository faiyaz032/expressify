const { StatusCodes } = require('http-status-codes');
const errorHandler = require('../libraries/error-handling');

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

module.exports = defineGlobalErrorHandler;
