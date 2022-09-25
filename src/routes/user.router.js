const express = require('express');

const routes = express.Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');
const loginMiddleware = require('../middlewares/login.middleware');

routes.post('/',
  userMiddleware.validateUserInfo,
  userController.create);
routes.get('/',
  loginMiddleware.checkToken,
  userController.getUsers);

module.exports = routes;