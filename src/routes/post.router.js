const express = require('express');

const routes = express.Router();
const postController = require('../controllers/post.controller');

const loginMiddleware = require('../middlewares/login.middleware');
const postMiddleware = require('../middlewares/post.middleware');

routes.post('/',
  loginMiddleware.checkToken,
  postMiddleware.validatePost,
  postController.create);

module.exports = routes;