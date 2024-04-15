const awilix = require('awilix');
const authModules = require('./modules/auth/auth.module');
const userModules = require('./modules/users/user.module');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

const loadDependencies = () => {
  //This is where you will register all your internal module
  container.register(authModules);
  container.register(userModules);
};

module.exports = { container, loadDependencies };
