const { StatusCodes } = require('http-status-codes');
const AppError = require('../error-handling/AppError');
const logger = require('../logger/LoggerManager');
const mongoose = require('mongoose');

class Database {
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = await mongoose.connect(this.connectionString);
      logger.info('Database connected successfully');
    } catch (error) {
      logger.error('Error connecting to the database');
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Error connecting to the database'
      );
    }
  }

  async disconnect() {
    if (this.connection) {
      await mongoose.disconnect();
      console.log('Database disconnected successfully!');
    }
  }
}

module.exports = Database;
