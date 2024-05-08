const express = require('express');
const userController = require('./user.controller');

const userRoutes = () => {
  const router = express.Router();

  router.get('/:userId', userController.getUserDetails);

  return router;
};

module.exports = userRoutes;
