const { Queue, Worker } = require('bullmq');
const logger = require('../logger/LoggerManager');

class MessageBroker {
  constructor(queueName, options = {}) {
    if (!MessageBroker.instance) {
      this.queue = new Queue(queueName);
      MessageBroker.instance = this;
      logger.info('Message broker started serving....');
    }

    return MessageBroker.instance;
  }

  // Method to add a job to the queue with a specific name
  async addJob(jobName, jobData, options = {}) {
    return await this.queue.add(jobName, jobData, options);
  }

  // Method to process jobs in the queue
  async processJob(workerFunction, concurrency = 1) {
    const worker = new Worker(this.queue.name, workerFunction, { concurrency });
    worker.on('completed', (job) => {
      logger.info(
        `Job ${job.id} (${job.name}) completed in queue '${this.queue.name}'`
      );
    });
    worker.on('failed', (job, err) => {
      logger.error(
        `Job ${job.id} (${job.name}) failed with error: ${err.message} in queue '${this.queue.name}'`
      );
    });
    worker.on('error', (err) => {
      logger.error(
        `Worker for queue '${this.queue.name}' encountered an error: ${err.message}`
      );
    });
  }

  // Method to clean up the queue
  async close() {
    logger.warn('Closing the message queue...');
    await this.queue.close();
  }
}

// Initialize MessageBroker instance with a queue name (singleton behavior)
const messageBroker = new MessageBroker('communicationQueue', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

module.exports = messageBroker;
