const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string()
  .min(8)
  .required(),
  email: Joi.string()
  .regex(/(.+)@(.+){2,}\.(.+){2,}/)
  .message('"email" must be a valid email')
  .required(),
  password: Joi.string()
  .min(6)
  .required(),
  image: Joi.string(),
});

module.exports = {
  userSchema,
};