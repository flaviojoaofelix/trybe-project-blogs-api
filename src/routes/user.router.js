const express = require('express');

const routes = express.Router();
const userController = require('../controllers/user.controller');

const userMiddleware = require('../middlewares/user.middleware');

routes.post('/',
  userMiddleware.validateUserInfo,
  userController.create);

module.exports = routes;