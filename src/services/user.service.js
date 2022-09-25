const { User } = require('../models');
const { login } = require('./login.service');

const checkUser = async ({ email }) => {
  const findUser = await User.findOne({
    attributes: ['id'],
    where: { email },
  });

  return !!findUser;
};

const create = async ({ displayName, email, password, image }) => {
  const userAlredyRegistered = await checkUser({ email });

  if (userAlredyRegistered) {
    const error = { status: 409, message: 'User already registered' };
    throw error;
  }

  await User.create({
    displayName,
    email,
    password,
    image,
  });

  const response = await login({ email, password });

  return response;
};

const getUsers = async (id) => {
  let response;

  if (id) {
    response = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  } else {
    response = await User.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  if (!response) {
    const errorMsg = { status: 404, message: 'User does not exist' };
    throw errorMsg;
  }

  return response;
};

module.exports = {
  checkUser,
  create,
  getUsers,
};
