const { DataTypes } = require('sequelize');
const sequelize = require('../database/client.js');
const { User } = require('./user.js');
const { Departamento } = require('./departamento.js');



const Tickets = sequelize.define('tickets', {
    ticket_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },  
    user_id: {
      type: DataTypes.INTEGER,
      references: {
      model: User,
      foreignKey: 'user_id'
      }
    },
    dept_id: {
        type: DataTypes.INTEGER,
        references: {
        model: Departamento,
        foreignKey: 'dept_id'
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
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now'),
    },
  });

  Tickets.belongsTo(User, {
    foreignKey: 'user_id',
  });

  Tickets.belongsTo(Departamento, {
    foreignKey: 'dept_id',
  });
  
  module.exports = {
    Tickets
  }