const { AsyncLocalStorage } = require('async_hooks');

const requestContext = new AsyncLocalStorage();

const getFromRequestContext = (key) => {
  return requestContext.getStore()?.get(key);
};

module.exports = { requestContext, getFromRequestContext };
