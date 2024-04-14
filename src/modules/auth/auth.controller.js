class AuthController {
  constructor({ authService }) {
    this.service = authService;
  }

  register = async (req, res, next) => {
    const user = await this.service.register();

    res.status(201).json({
      success: true,
      message: 'User successfully register',
      data: user,
    });
  };
}

module.exports = AuthController;
