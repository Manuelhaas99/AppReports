const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
    throw error;
  }
};

module.exports = {
  encryptPassword,
};
