const Joi = require('joi');

const missingMsg = 'Some required fields are missing';

const loginSchema = Joi.object({
  email: Joi.string()
  .pattern(/(.+)@(.+){2,}\.(.+){2,}/)
  .empty()
  .required()
  .messages({
    'string.pattern.base': '"email" must be a valid email',
    'string.empty': missingMsg,
    'string.required': missingMsg,
  }),
  password: Joi.string()
  .min(6)
  .message(missingMsg)
  .required(),
});

module.exports = {
  loginSchema,
};