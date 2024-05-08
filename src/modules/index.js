const initializeAuthModule = require('./auth');
const initializeProfileModule = require('./profile');
const initializeUserModule = require('./users');

const initializeCoreModules = (expressRouter) => {
  initializeAuthModule(expressRouter);
  initializeUserModule(expressRouter);
  initializeProfileModule(expressRouter);
  //Initialize other routers
};

module.exports = initializeCoreModules;
