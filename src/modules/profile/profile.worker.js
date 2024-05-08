const messageBroker = require('../../shared/message-broker/MessageBroker');

const initWorkers = () => {
  messageBroker.processJob(async (job) => {
    job.returnvalue = { name: 'Hello World' };
  });
};

module.exports = initWorkers;
