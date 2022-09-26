const postService = require('../services/post.service');

const create = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { title, content, categoryIds } = req.body;

    const response = await postService.create({
      authorization,
      title,
      content,
      categoryIds,
    });

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await postService.getPosts(id);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getPosts,
};