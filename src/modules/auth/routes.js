const express = require('express');
const { register } = require('./controller');

const authRoutes = () => {
  const router = express.Router();

  router.get('/register', register);

  return router;
};

module.exports = authRoutes;
