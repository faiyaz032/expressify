const register = (req, res, next) => {
  res.json({
    success: true,
    message: 'I am register controller',
  });
};

module.exports = { register };
