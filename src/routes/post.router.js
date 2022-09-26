const express = require('express');

const routes = express.Router();
const postController = require('../controllers/post.controller');

const loginMiddleware = require('../middlewares/login.middleware');
const postMiddleware = require('../middlewares/post.middleware');

routes.post('/',
  loginMiddleware.checkToken,
  postMiddleware.validatePost,
  postController.create);
routes.get('/',
  loginMiddleware.checkToken,
  postController.getPosts);
routes.get('/:id',
  loginMiddleware.checkToken,
  postController.getPosts);

module.exports = routes;