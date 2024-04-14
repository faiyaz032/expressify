const { StatusCodes } = require('http-status-codes');
const AppFactory = require('./app');
const errorHandler = require('./libraries/error-handling');
const logger = require('./libraries/logger/LoggerManager');

class Server {
  constructor() {
    this.connection = undefined;
  }

  async run() {
    const expressApp = AppFactory.createApp();
    const server = await this.openConnection(expressApp);
    logger.info(`Server will be live on PORT:${server.port}`);
  }

  async terminate() {
    return new Promise((resolve) => {
      if (this.connection !== undefined) {
        this.connection.close(() => {
          resolve();
        });
      }
    });
  }

  async openConnection(expressApp) {
    return new Promise((resolve, reject) => {
      const PORT = process.env.PORT || 8008;

      this.connection = expressApp.listen(PORT, () => {
        errorHandler.listenToErrorEvents(this.connection);
        resolve(this.connection.address());
      });
    });
  }
}

module.exports = Server;
