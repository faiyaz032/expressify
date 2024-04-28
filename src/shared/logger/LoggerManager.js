const winston = require('winston');
const { getFromRequestContext } = require('../utils/requestContext');

function createLoggerInstance() {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json(),
      winston.format((info) => {
        const requestId = getFromRequestContext('requestId');
        if (requestId) {
          info.requestId = requestId;
        }
        return info;
      })()
    ),
  });

  // Add console transport if not in production environment
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.simple()
        ),
      })
    );
  }

  return logger;
}

const logger = createLoggerInstance();

module.exports = logger; // Export the logger instance
