const promClient = require('prom-client');

const defineMetrics = async (expressApp) => {
  //collect Default Metrics
  promClient.collectDefaultMetrics();

  //define custom metrics

  // Expose metrics endpoint
  expressApp.get('/metrics', async (req, res) => {
    try {
      res.setHeader('Content-Type', promClient.register.contentType);
      const metrics = await promClient.register.metrics();
      res.send(metrics);
    } catch (error) {
      console.error('Error fetching metrics:', error);
      res.status(500).send('Error fetching metrics');
    }
  });
};

module.exports = defineMetrics;
