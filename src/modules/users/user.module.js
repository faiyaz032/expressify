const { asClass } = require('awilix');
const UserRepository = require('./user.repository');

const userModules = {
  userRepository: asClass(UserRepository),
};

module.exports = userModules;
