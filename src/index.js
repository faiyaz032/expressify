const logger = require('./libraries/logger/LoggerManager');
const Server = require('./server');

const runServer = async () => {
  const server = new Server();
  await server.run();
};

runServer()
  .then(() => {
    logger.info(`Server is successfully live`);
  })
  .catch((error) => {
    logger.error(error);
  });
