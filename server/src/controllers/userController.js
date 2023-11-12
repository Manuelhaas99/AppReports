const { encryptPassword } = require('../utils/password-hash');
const { User } = require('../models/user');

const postUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserValid = await User.findOne({
      where: { email },
    });

    if (isUserValid) {
      res.json({ message: 'usuario ya registrado', status: 'WARN' });
      return;
    }

    if (!password) {
      res.json({ message: 'Inserta un contraseña' });
      return;
    }

    const createdAt = Date.now() / 1000.0;
    const hashedPassword = await encryptPassword(password);

    console.log('Creando usuario');

    const newUser = await User.create({
      email,
      password: hashedPassword,
      createdAt,
    });

    if (!newUser.user_id) {
      res.json({ message: 'Usuario no creado' });
      return;
    }
    console.log('Usuario creado');
    res.json({ message: 'usuario registrado exitosamente', status: 'OK' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Error al registrar usuario' });
  }
};

const getUsers = async (req, res) => {
  const usersFromDb = await User.findAll();
  const { password, ...users } = usersFromDb;
  res.json({ users });
};

module.exports = {
  postUser,
  getUsers,
};
