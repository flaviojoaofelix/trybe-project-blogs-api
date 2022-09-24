const { loginSchema } = require('./schemas/login.schema');

const loginValidation = (req, res, next) => {
  const user = req.body;
  const validate = loginSchema.validate(user);

  if (validate.error) {
    const error = { status: 400, message: validate.error.message };
    return next(error);
  }

  return next();
};

module.exports = {
  loginValidation,
};