const { userSchema } = require('./schemas/user.schema');

const validateUserInfo = (req, _res, next) => {
  const userInfo = req.body;
  const validate = userSchema.validate(userInfo);

  if (validate.error) {
    const error = { status: 400, message: validate.error.message };
    return next(error);
  }

  return next();
};

module.exports = {
  validateUserInfo,
};