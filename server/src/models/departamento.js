const { DataTypes } = require('sequelize');
const sequelize = require('../database/client.js');
const { User } = require('./user.js');


const Departamento = sequelize.define('departamento', {
    dept_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
        },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
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
    Departamento
  }
  
  