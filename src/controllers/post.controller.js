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

const update = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { title, content } = req.body;

    const response = await postService.update({
      authorization,
      id,
      title,
      content,
    });

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;

    await postService.remove({
      authorization,
      id,
    });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const { q } = req.query;

    const response = await postService.search(q);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getPosts,
  update,
  remove,
  search,
};