const { Category } = require('../models');

const create = async ({ name }) => {
  const response = await Category.create({
    name,
  });

  return response;
};

const getCategories = async () => {
  const response = await Category.findAll();

  return response;
};

const checkCategory = async (id) => {
  const response = Category.findOne({
    where: { id },
  });

  return response;
};

module.exports = {
  create,
  getCategories,
  checkCategory,
};