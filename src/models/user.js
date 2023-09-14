const { DataTypes } = require('sequelize');
const sequelize = require('../database/client.js');

const { Departamento } = require('./departamento.js');


const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dept_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: Departamento,
    foreignKey: 'dept_id'
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
     // Habilita la creación automática de las columnas "createdAt" y "updatedAt"
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now'),
    },
  }, {
    timestamps: true,
});


User.belongsTo(Departamento, {
  foreignKey: 'dept_id',
});

module.exports = {
  User
}

