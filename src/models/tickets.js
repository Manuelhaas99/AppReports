const { DataTypes } = require('sequelize');
const sequelize = require('../database/client.js');
const { User } = require('./user.js');
const { Departamento } = require('./departamento.js');



const Tickets = sequelize.define('tickets', {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
      model: User,
      key: 'user_id'
      }
    },
    departamentoId: {
        type: DataTypes.INTEGER,
        references: {
        model: Departamento,
        key: 'departamentoId'
        }
    },
    status: {
      type: DataTypes.ENUM('En Proceso', 'Revisado', 'Pendiente'),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false 
    },
    observaciones: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    area: {
        type: DataTypes.CHAR,
        allowNull: false 
    }
  })

  Tickets.belongsTo(User, {
    foreignKey: 'user_id',
  });

  Tickets.belongsTo(Departamento, {
    foreignKey: 'departamentoId',
  });
  
  module.exports = {
    Tickets
  }