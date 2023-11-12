const { PlantasElectricas } = require('../models/plantasElectricas.js');

const postPlantasElectricas = async (req, res) => {
  try {
    const {
      plantasId, observaciones, motivo, nombre, equipo, firma,
    } = req.body;

    const newPlantaElectrica = await PlantasElectricas.create({
      plantasId,
      motivo,
      nombre,
      observaciones,
      equipo,
      firma,
    });

    res.status(201).json(newPlantaElectrica);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor. ' });
  }
};

module.exports = {
  postPlantasElectricas,
};
