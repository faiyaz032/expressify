const { randomUUID } = require('crypto');

const generateRandomId = () => {
  return randomUUID();
};

module.exports = generateRandomId;
