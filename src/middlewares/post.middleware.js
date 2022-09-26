const { postSchema } = require('./schemas/post.schema');

const validatePost = (req, _res, next) => {
  const validate = postSchema.validate(req.body);
  
  if (validate.error) {
    const error = { status: 400, message: validate.error.message };
    return next(error);
  }

  return next();
};

module.exports = {
  validatePost,
};