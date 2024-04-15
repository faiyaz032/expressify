require('dotenv').config();
const config = require('./configs');
const { loadDependencies } = require('./dependencies');
const Database = require('./libraries/database/Database');
const logger = require('./libraries/logger/LoggerManager');
const Server = require('./server');

const runServer = async () => {
  //Load all the dependencies
  loadDependencies();

  try {
    const database = new Database(config.get('databaseConnectionString'));
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
