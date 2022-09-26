const { BlogPost, PostCategory, User, Category } = require('../models');
const categoryService = require('./category.service');
const { validateToken } = require('../utils/JWT');

const checkCategory = async (categoryIds) => {
  const categories = await Promise.all(
    categoryIds.map(async (id) => {
      const check = await categoryService.checkCategory(id);

      return check;
    }),
  );
  const isCategoriesInvalid = await categories.some((category) => !category);

  return isCategoriesInvalid;
};

const createPostCategory = async ({ postId, categoryIds }) => {
  const response = await Promise.all(categoryIds.map(async (id) => {
    await PostCategory.create({
      postId,
      categoryId: id,
    }); 
}));

  return response;
};

const create = async (req) => {
  const { title, content, categoryIds } = req.body;
  const user = validateToken(req.headers.authorization);

  const isCategoriesInvalid = await checkCategory(categoryIds);

  if (isCategoriesInvalid) {
    const errorMsg = { status: 400, message: '"categoryIds" not found' };
    throw errorMsg;
  }

  const response = await BlogPost.create({
    title,
    content,
    userId: user.id,
  });

  await createPostCategory({
    postId: response.id,
    categoryIds,
  });

  return response;
};

const getById = async (id) => {
  const response = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User, as: 'user', attributes: { exclude: ['password'] },
    },
    {
      model: Category, as: 'categories', through: { attributes: [] },
    }],
  });

  return response;
};

const getAll = async () => {
  const response = await BlogPost.findAll({
    include: [{
      model: User, as: 'user', attributes: { exclude: ['password'] },
    },
    {
      model: Category, as: 'categories', through: { attributes: [] },
    }],
  });

  return response;
};

const getPosts = async (id) => {
  let response;

  if (id) {
    response = await getById(id);
  } else {
    response = await getAll();
  }

  if (!response) {
    const errorMsg = { status: 404, message: 'Post does not exist' };
    throw errorMsg;
  }

  return response;
};

module.exports = {
  create,
  getPosts,
};
