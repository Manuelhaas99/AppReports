const { DataTypes } = require('sequelize');
const sequelize = require('../database/client.js');


const Seguridad = sequelize.define('seguridad', {
  seguridad_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  entrada: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  salida: {
    type: DataTypes.TIME,
    allowNull: false
  },
  nombre: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  institucion: {
    type: DataTypes.CHAR(55),
    allowNull: false
  },
  motivo: {
    type: DataTypes.CHAR(55),
    allowNull: false
  },
  firma: {
    type: DataTypes.CHAR(55),
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
})

  
module.exports = {
    Seguridad
  }
  