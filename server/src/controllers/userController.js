const User = require('../models/user');
const bcrypt = require('bcrypt');


const postUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const usernameValid = await pool.query(
      'SELECT username FROM users WHERE username = $1',
      [username]
    );

    if (usernameValid.rows.length !== 0) {
      res.json({ message: 'usuario ya registrado' });
    }

    if (!password) {
      res.json({ message: 'Inserta un contraseña' });
    }

    const createdAt = Date.now() / 1000.0;
    const hashedPassword = await encryptPassword(password);
    const role = 'user';

    const newUser = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [username, hashedPassword, role, createdAt]
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