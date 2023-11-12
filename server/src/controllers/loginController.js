const { User } = require('../models/user');

const postLogin = async (req, res) => {
  const { username, password } = req.body;

  // Realizar una consulta a la base de datos para verificar las credenciales
  const user = await User.findOne({ where: { username, password } });

  if (user) {
    // Credenciales válidas, el usuario existe
    // Aquí puedes generar un token de autenticación o crear una sesión
    // y enviar una respuesta exitosa al cliente.
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } else {
    // Credenciales inválidas, el usuario no existe o la contraseña es incorrecta
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
};

module.exports = {
  postLogin,
};
