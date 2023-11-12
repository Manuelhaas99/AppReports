const express = require('express');

const routes = express.Router();
const jardineriaController = require('../controllers/jardineriaController');

routes.get('/', jardineriaController.getJardineria);
routes.post('/', jardineriaController.postJardineria);

module.exports = routes;
