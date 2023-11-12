const express = require('express');

const routes = express.Router();
const plantasElectricasController = require('../controllers/plantasElectricasController');

routes.post('/', plantasElectricasController.postPlantasElectricas);

module.exports = routes;
