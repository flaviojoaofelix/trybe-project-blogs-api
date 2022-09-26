const { Op } = require('sequelize');

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

const create = async ({ authorization, title, content, categoryIds }) => {
  const user = validateToken(authorization);

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

const checkUserPost = async ({ authorization, id }) => {
  const userInfo = await validateToken(authorization);
  const postInfo = await getById(id);

  if (!postInfo) {
    const errorMsg = { status: 404, message: 'Post does not exist' };
    throw errorMsg;
  }
  if (postInfo.userId !== userInfo.id) {
    const errorMsg = { status: 401, message: 'Unauthorized user' };
    throw errorMsg;
  }

  return null;
};

const update = async ({ authorization, id, title, content }) => {
  await checkUserPost({ authorization, id });

  await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  const response = getById(id);

  return response;
};

const remove = async ({ authorization, id }) => {
  await checkUserPost({ authorization, id });

  await BlogPost.destroy({ where: { id } });

  return null;
};

const getByQuery = async (q) => {
  const response = await BlogPost.findOne({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [{
      model: User, as: 'user', attributes: { exclude: ['password'] },
    },
    {
      model: Category, as: 'categories', through: { attributes: [] },
    }],
  });

  if (!response) return [];
  return [response];
};

const search = async (q) => {
  let response;

  if (!q) {
    response = await getAll();
  } else {
    response = await getByQuery(q);
  }

  if (!response) {
    response = [];
  }

  return response;
};

module.exports = {
  create,
  getPosts,
  update,
  remove,
  search,
};
