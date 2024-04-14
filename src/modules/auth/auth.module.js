const { asClass } = require('awilix');
const AuthController = require('./auth.controller');
const AuthService = require('./auth.service');

const authModules = {
  authController: asClass(AuthController),
  authService: asClass(AuthService),
};

module.exports = authModules;
