const express = require('express');
const { StatusCodes } = require('http-status-codes');
const AppError = require('./libraries/error-handling/AppError');

const initializeApp = (expressApp) => {
  const router = express.Router();

  expressApp.get('/health', (req, res) => {
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Server is healthy',
    });
  });

  expressApp.all('*', (req, res, next) => {
    next(
      new AppError(
        StatusCodes.NOT_FOUND,
        `Can't find your requested url: '${req.originalUrl}' in the server`
      )
    );
  });
};

module.exports = initializeApp;
