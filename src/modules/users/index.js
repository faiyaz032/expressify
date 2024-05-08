const userRoutes = require('./user.routes');

const initializeUserModule = (expressRouter) => {
  expressRouter.use('/users', userRoutes());
};

module.exports = initializeUserModule;
