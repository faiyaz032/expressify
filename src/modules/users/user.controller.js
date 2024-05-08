const messageBroker = require('../../shared/message-broker/MessageBroker');
const UserRepository = require('./user.repository');

class UserController {
  constructor() {
    this.repository = new UserRepository();
  }

  getUserDetails = async (req, res, next) => {
    try {
      const data = await this.repository.getUserById(req.params.userId);

      const job = await messageBroker.addJob('userRequested', {
        id: req.params.userId,
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}

const userController = new UserController();

module.exports = userController;
