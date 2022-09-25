const Joi = require('joi');

const requiredMsg = '"name" is required';

const categorySchema = Joi.object({
  name: Joi.string()
  .required()
  .messages({
    'string.empty': requiredMsg,
    'string.required': requiredMsg,
  }),
});

module.exports = {
  categorySchema,
};