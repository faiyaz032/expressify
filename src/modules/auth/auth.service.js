class AuthService {
  constructor({ userRepository }) {
    this.repository = userRepository;
  }
  async register() {
    return {
      userId: await this.repository.getUserId(),
      token: 'xyz',
    };
  }
}

module.exports = AuthService;
