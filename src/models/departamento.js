const { DataTypes } = require('sequelize');
const sequelize = require('../database/client.js');


const Departamento = sequelize.define('departamento', {
    departamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
        },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },

  })

module.exports = {
    Departamento
  }
  
  