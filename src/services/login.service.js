const { User } = require('../models');

const { generateToken } = require('../utils/JWT');

const checkUserInfo = async ({ email, password }) => {
  const checkUser = await User.findOne({
    attributes: ['id', 'displayName', 'email'],
    where: { email, password },
  });

  return checkUser;
};

const getToken = async ({ id, displayName, email }) => {
  const payload = {
    id,
    displayName,
    email,
  };

  const token = generateToken(payload);

  return { token };
};

const login = async ({ email, password }) => {
  const checkUser = await checkUserInfo({ email, password });

  if (!checkUser) {
    const error = { status: 400, message: 'Invalid fields' };
    throw error;
  }

  console.log(`resultado checkuser: ${checkUser.dataValues}`);
  const token = getToken(checkUser.dataValues);

  return token;
};

module.exports = {
  login,
};