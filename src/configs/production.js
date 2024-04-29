module.exports = {
  port: 8008,
  mongodbConnectionString:
    process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/my_app',
};
