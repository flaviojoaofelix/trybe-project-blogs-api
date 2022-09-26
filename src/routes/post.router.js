const express = require('express');

const routes = express.Router();
const postController = require('../controllers/post.controller');

const loginMiddleware = require('../middlewares/login.middleware');
const postMiddleware = require('../middlewares/post.middleware');

routes.get('/search',
  loginMiddleware.checkToken,
  postController.search);
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
routes.put('/:id',
  loginMiddleware.checkToken,
  postMiddleware.validatePostUpdate,
  postController.update);
routes.delete('/:id',
  loginMiddleware.checkToken,
  postController.remove);

module.exports = routes;