const express = require('express');

const profileRoutes = () => {
  const router = express.Router();

  router.get('/', (req, res) => {});

  return router;
};

module.exports = profileRoutes;
