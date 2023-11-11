const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const bcrypt = require('bcrypt'); // Para el hashing de contraseñas
const { User } = require('../models/user'); // Importa el modelo de usuario definido con Sequelize


router.post('/user', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe.' });
    }

    // Hashea la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario en la base de datos
    const newUser = await User.create({ email, password: hashedPassword });

    // Puedes generar un token de autenticación aquí si lo deseas

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el registro de usuario.' });
  }
});

router.post('/login', authController.login);

module.exports = router;
