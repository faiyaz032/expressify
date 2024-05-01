const generateRandomId = require('../shared/utils/generateRandomId');
const { requestContext } = require('../shared/utils/requestContext');

const REQUEST_ID_HEADER_NAME = 'x-request-id';

const addRequestId = (req, res, next) => {
  const existingRequestId = req.headers[REQUEST_ID_HEADER_NAME];

  const requestId = existingRequestId || generateRandomId();

  res.setHeader(REQUEST_ID_HEADER_NAME, requestId);

  requestContext.run(new Map(), () => {
    requestContext.getStore().set('requestId', requestId);
    next();
  });
};

module.exports = addRequestId;
