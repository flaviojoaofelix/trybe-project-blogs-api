const userService = require('../services/user.service');

const create = async (req, res, next) => {
  try {
    const response = await userService.create(req.body);

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const response = await userService.getUsers(req.params.id);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    await userService.remove(authorization);

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getUsers,
  remove,
};