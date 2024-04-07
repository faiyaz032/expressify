const express = require('express');
const { StatusCodes } = require('http-status-codes');

const initializeApp = (expressApp) => {
  const router = express.Router();

  expressApp.get('/health', (req, res) => {
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Server is healthy',
    });
  });
};

module.exports = initializeApp;
