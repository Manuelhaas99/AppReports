const { DataTypes } = require('sequelize');
const sequelize = require('../database/client.js');


const PlantasElectricas = sequelize.define('plantaselectricas', {
    plantas_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
 
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observaciones: {
        type: DataTypes.CHAR,
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
    PlantasElectricas
  }
  