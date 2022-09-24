const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const login = async ({ email, password }) => {
  const findUser = await User.findOne({
    attributes: ['id', 'displayName', 'email'],
    where: { email, password },
  });

  if (!findUser) {
    const error = { status: 400, message: 'Invalid fields' };
    throw error;
  }

  const token = generateToken(findUser.dataValues);

  return { token };
};

module.exports = {
  login,
};