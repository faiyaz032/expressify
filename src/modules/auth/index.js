const authRoutes = require('./auth.routes');

const initializeAuthModule = (expressRouter) => {
  expressRouter.use('/auth', authRoutes());
};

module.exports = initializeAuthModule;
