const authRoutes = require('./routes');

const initializeAuthModule = (expressRouter) => {
  expressRouter.use('/auth', authRoutes());
};

module.exports = initializeAuthModule;
