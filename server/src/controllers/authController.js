const User = require('../models/user');
const bcrypt = require('bcrypt');

const authController = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      if (user.password !== password) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      // Autenticación exitosa
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error de servidor' });
    }
  },
};

module.exports = authController;
