const express = require('express');
const { container } = require('../../dependencies');

const authRoutes = () => {
  const router = express.Router();

  const authController = container.resolve('authController');

  router.get('/register', authController.register);

  return router;
};

module.exports = authRoutes;
