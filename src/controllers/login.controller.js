const loginService = require('../services/login.service');

const login = async (req, res, next) => {
  try {
    const response = await loginService.login(req.body);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};