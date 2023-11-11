const { DataTypes } = require('sequelize');
const sequelize = require('../database/client.js');


const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(30),
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


module.exports = {
  User
}
