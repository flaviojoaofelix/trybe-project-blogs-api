const { categorySchema } = require('./schemas/category.schema');

const validateName = (req, _res, next) => {
  const validate = categorySchema.validate(req.body);
  
  if (validate.error) {
    const error = { status: 400, message: validate.error.message };
    return next(error);
  }

  return next();
};

module.exports = {
  validateName,
};