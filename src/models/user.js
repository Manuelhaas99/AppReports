const { DataTypes } = require('sequelize');
const sequelize = require('../database/client.js');


const { Departamento } = require('./departamento.js');

const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  departamentoId: {
    type: DataTypes.INTEGER,
    references: {
    model: Departamento,
    key: 'departamentoId'
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false 
  },
  email: {
    type: DataTypes.CHAR(55),
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('admin', 'usuario', 'invitado'),
    allowNull: false
  },
})

User.belongsTo(Departamento, {
  foreignKey: 'departamentoId',
});

module.exports = {
  User
}

