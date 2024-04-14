const initializeAuthModule = require('./auth');

const initializeCoreModules = (expressRouter) => {
  initializeAuthModule(expressRouter);

  //Initialize other routers
};

module.exports = initializeCoreModules;
