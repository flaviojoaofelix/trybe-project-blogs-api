const express = require('express');

const routes = express.Router();
const categoryController = require('../controllers/category.controller');

const loginMiddleware = require('../middlewares/login.middleware');
const categoryMiddleware = require('../middlewares/category.middleware');

routes.post('/',
  loginMiddleware.checkToken,
  categoryMiddleware.validateName,
  categoryController.create);

module.exports = routes;