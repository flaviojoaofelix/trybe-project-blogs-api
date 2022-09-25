const { loginSchema } = require('./schemas/login.schema');
const jwt = require('../utils/JWT');

const validateUserInfo = (req, res, next) => {
  const user = req.body;
  const validate = loginSchema.validate(user);

  if (validate.error) {
    const error = { status: 400, message: validate.error.message };
    return next(error);
  }

  return next();
};

const checkToken = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const error = { status: 401, message: 'Token not found' };
    next(error);
  }

  try {
    const validation = jwt.validateToken(authorization);

    req.headers.authorization = validation;
  } catch (error) {
    const errorMsg = { status: 401, message: 'Expired or invalid token' };
    next(errorMsg);
  }

  next();
};

module.exports = {
  validateUserInfo,
  checkToken,
};