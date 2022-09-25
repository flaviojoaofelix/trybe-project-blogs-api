const userService = require('../services/user.service');

const create = async (req, res, next) => {
  try {
    const response = await userService.create(req.body);

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};