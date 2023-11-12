const jwt = require('jsonwebtoken');

const { secretKey } = require('../controllers/loginController');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Acceso no autorizado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
};
