const initializeAuthModule = require('./auth');

const initializeModules = (expressRouter) => {
  initializeAuthModule(expressRouter);
};

module.exports = initializeModules;
