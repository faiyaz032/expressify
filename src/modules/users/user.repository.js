const fs = require('fs/promises');
const path = require('path');

class UserRepository {
  async getUserById(userId) {
    const filePath = path.join(__dirname, '..', '..', '..', 'database.json');
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    const user = data.users.find((user) => user.id == userId);

    return user;
  }
}

module.exports = UserRepository;
