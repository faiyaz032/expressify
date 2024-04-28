const express = require('express');

const authRoutes = () => {
  const router = express.Router();

  router.get('/register', (req, res) => {});

  return router;
};

module.exports = authRoutes;
