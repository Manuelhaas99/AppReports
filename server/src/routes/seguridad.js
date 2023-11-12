const express = require('express');

const routes = express.Router();
const seguridadController = require('../controllers/seguridadController');

routes.post('/', seguridadController.postSeguridad);

module.exports = routes;
