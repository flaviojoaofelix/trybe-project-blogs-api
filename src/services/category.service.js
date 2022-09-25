const { Category } = require('../models');

const create = async ({ name }) => {
  const response = await Category.create({
    name,
  });

  return response;
};

module.exports = {
  create,
};