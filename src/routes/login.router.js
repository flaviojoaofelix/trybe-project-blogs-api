const express = require('express');

const routes = express.Router();
const loginController = require('../controllers/login.controller');

const loginMiddleware = require('../middlewares/login.middleware');

routes.post('/',
  loginMiddleware.loginValidation,
  loginController.login);

module.exports = routes;