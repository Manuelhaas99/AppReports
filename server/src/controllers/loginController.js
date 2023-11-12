const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { verifyPassword } = require('../utils/password-hash');

// Regenera esto y no lo mandes a prod, este debe ser un secreto dentro de tu repo.
const secretKey = 'dshjkloidhjksaffadhjksfhjkdafhjkasdfhjkadshjkfahjksdfhjkdsaf';

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  // Realizar una consulta a la base de datos para verificar las credenciales
  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.json({ message: 'Usuario no encontrado' });
    return;
  }

  const isUserVerified = await verifyPassword(password, user.password);

  if (isUserVerified) {
    // Credenciales válidas, el usuario existe
    // Aquí puedes generar un token de autenticación o crear una sesión
    // y enviar una respuesta exitosa al cliente.
    const userJwt = jwt.sign(
      { userId: user.userId, email: user.email },
      secretKey,
      { expiresIn: '1h' },
    );
    res.status(200).json({ message: 'Inicio de sesión exitoso', userToken: userJwt });
  } else {
    // Credenciales inválidas, el usuario no existe o la contraseña es incorrecta
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
};

module.exports = {
  postLogin,
  secretKey,
};
