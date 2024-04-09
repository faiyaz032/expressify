const generateRandomId = require('../libraries/common/generateRandomId');
const { requestContext } = require('../libraries/utils/requestContext');

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
