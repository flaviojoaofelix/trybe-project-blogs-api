const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'secretJWT';

const generateToken = (payload) => {
  const config = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, SECRET_KEY, config);

  return token;
};

const validateToken = (token) => {
    const validation = jwt.verify(token, SECRET_KEY);

    return validation;
};

module.exports = {
  generateToken,
  validateToken,
};