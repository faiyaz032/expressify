const AppFactory = require('./app');
const config = require('../configs');
const errorHandler = require('../shared/error-handling');
const logger = require('../shared/logger/LoggerManager');

class Server {
  constructor(database) {
    this.connection = undefined;
    this.database = database;
  }

  async run() {
    const expressApp = AppFactory.createApp();
    const server = await this.openConnection(expressApp);
    this.database.connect();

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
      const PORT = process.env.PORT || config.get('port');

      this.connection = expressApp.listen(PORT, () => {
        errorHandler.listenToErrorEvents(this.connection);
        resolve(this.connection.address());
      });
    });
  }
}

module.exports = Server;
