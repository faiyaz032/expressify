const { startServer } = require('./server');

const start = async () => {
  await startServer();
};

start()
  .then(() => {
    console.log(`Server started successfully`);
  })
  .catch((error) => {
    console.error(error);
  });
