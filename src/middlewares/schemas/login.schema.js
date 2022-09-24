const Joi = require('joi');

const missingMsg = 'Some required fields are missing';

const loginSchema = Joi.object({
  email: Joi.string()
  .regex(/(.+)@(.+){2,}\.(.+){2,}/)
  .required()
  .empty()
  .messages({
    // eslint-disable-next-line quote-props
    'string.empty': missingMsg,
    'any.required': missingMsg,
  }),
  password: Joi.string()
  .required()
  .messages({
    // eslint-disable-next-line quote-props
    'string.empty': missingMsg,
    'any.required': missingMsg,
  }),
});

module.exports = {
  loginSchema,
};