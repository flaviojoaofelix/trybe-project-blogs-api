const postService = require('../services/post.service');

const create = async (req, res, next) => {
  try {
    const response = await postService.create(req);

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const response = await postService.getPosts(req.params.id);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getPosts,
};