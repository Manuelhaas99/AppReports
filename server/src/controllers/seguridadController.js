const { Seguridad } = require('../models/seguridad');

const postSeguridad = async (req, res) => {
  try {
    const { seguridadId, entrada, salida, nombre, institucion, motivo, firma } = req.body;

    const newSeguridad = await Seguridad.create({
      seguridadId,
      entrada,
      salida,
      nombre,
      institucion,
      motivo,
      firma,
    });

    res.status(201).json(newSeguridad);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor. ' });
  }
};

module.exports = {
  postSeguridad,
};
