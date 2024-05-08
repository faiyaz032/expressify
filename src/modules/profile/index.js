const profileRoutes = require('./profile.routes');
const initWorkers = require('./profile.worker');

const initializeProfileModule = (expressRouter) => {
  initWorkers();
  expressRouter.use('/profiles', profileRoutes());
};

module.exports = initializeProfileModule;
