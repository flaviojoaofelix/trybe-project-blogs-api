const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'secretJWT';

const generateToken = ({ id, displayName, email }) => {
  const payload = {
    id,
    displayName,
    email,
  };

  const config = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, SECRET_KEY, config);

  return token;
};

module.exports = {
  generateToken,
};