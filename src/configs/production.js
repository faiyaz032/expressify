const _productionConfigs = {
  port: process.env.PORT || 8009,
  databaseConnectionString: process.env.PROD_DB_CONNECTION_STRING,
};

module.exports = _productionConfigs;
