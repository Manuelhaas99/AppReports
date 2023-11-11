const express = require('express');
const router = express.Router();
const pool = require('../db/pool'); // Importa la configuración de la base de datos

const postUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const usernameValid = await pool.query(
        'SELECT email FROM users WHERE username = $1',
        [email]
      );
  
      if (usernameValid.rows.length !== 0) {
        res.json({ message: 'usuario ya registrado' });
      }
  
      if (!password) {
        res.json({ message: 'Inserta un contraseña' });
      }
  

  
      const newUser = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2)',
        [email, password]
      );
  
      if (newUser.rowCount > 0) {
        res.json({ message: 'usuario registrado exitosamente', status: 'OK' });
      }
    } catch (error) {
      errorHandling(error, res);
    }
  };

  module.exports = {
    postUser,
  };