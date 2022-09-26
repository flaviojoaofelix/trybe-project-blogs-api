const postService = require('../services/post.service');

const create = async (req, res, next) => {
  try {
    const response = await postService.create(req);

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};