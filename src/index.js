const { loadDependencies } = require('./configs/container');
const Database = require('./libraries/database/Database');
const logger = require('./libraries/logger/LoggerManager');
const Server = require('./server');

const runServer = async () => {
  //Load all the dependencies
  loadDependencies();

  try {
    const database = new Database('mongodb://127.0.0.1:27017/my_app');
    const server = new Server(database);
    await server.run();
  } catch (error) {}
};

runServer()
  .then(() => {
    logger.info(`Server is successfully live`);
  })
  .catch((error) => {
    logger.error(error);
  });
