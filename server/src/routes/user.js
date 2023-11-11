const express = require('express');

const routes = express.Router();
const userController = require('../controllers/userController');

routes.post('/', userController.postUser);
routes.get('/', userController.getUsers);

module.exports = routes;
