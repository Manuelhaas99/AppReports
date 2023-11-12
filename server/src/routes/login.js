const express = require('express');

const routes = express.Router();
const loginController = require('../controllers/loginController');

routes.post('/', loginController.postLogin);

module.exports = routes;
