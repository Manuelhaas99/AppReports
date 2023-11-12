const { Jardineria } = require('../models/jardineria.js');

const getJardineria = async (req, res) => {
  try {
    // Consulta todos los tickets en la base de datos utilizando Sequelize
    const jardineria = await Jardineria.findAll();

    // Devuelve los tickets como respuesta en formato JSON
    res.json(jardineria);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const postJardineria = async (req, res) => {
  try {
    const {
      nombre, area, observaciones, vistobueno,
    } = req.body;

    const newJardineria = await Jardineria.create({
      nombre,
      area,
      observaciones,
      vistobueno,
    });

    res.status(201).json(newJardineria);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor. ' });
  }
};

module.exports = {
  getJardineria,
  postJardineria,
};
