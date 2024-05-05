const config = require('./configs');
const Database = require('./shared/database/Database');
const logger = require('./shared/logger/LoggerManager');
const Server = require('./app/server');

const runServer = async () => {
  try {
    const database = new Database(config.get('mongodbConnectionString'));
    const server = new Server(database);

    await server.run();

    logger.info(`Server is successfully live`);
  } catch (error) {
    logger.error(error);
  }
};

runServer().catch((error) => {
  logger.error(error);
});
