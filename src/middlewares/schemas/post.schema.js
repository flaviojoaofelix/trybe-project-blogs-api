const Joi = require('joi');

const requiredMsg = 'Some required fields are missing';
const messages = {
  'string.empty': requiredMsg,
  'string.required': requiredMsg,
};

const postSchema = Joi.object({
  title: Joi.string()
  .required()
  .messages(messages),
  content: Joi.string()
  .required()
  .messages(messages),
  categoryIds: Joi.array()
  .required()
  .messages(messages),
});

const postUpdateSchema = Joi.object({
  title: Joi.string()
  .required()
  .messages(messages),
  content: Joi.string()
  .required()
  .messages(messages),
});

module.exports = {
  postSchema,
  postUpdateSchema,
};