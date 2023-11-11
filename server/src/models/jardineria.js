const { DataTypes } = require('sequelize');
const sequelize = require('../database/client.js');


const Jardineria = sequelize.define('jardineria', {
  jardineria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false
  },
  observaciones: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  vistobueno: {
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
// const Jardineria = sequelize.define('jardineria', {
//     jardineria_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//   },  
//     user_id: {
//       type: DataTypes.INTEGER,
//       references: {
//       model: User,
//       foreignKey: 'user_id'
//       }
//     },
//     dept_id: {
//         type: DataTypes.INTEGER,
//         references: {
//         model: Departamento,
//         foreignKey: 'dept_id'
//         }
//     }, 
//     status: {
//       type: DataTypes.ENUM('En Proceso', 'Revisado', 'Pendiente'),
//       allowNull: false
//     },
//     fecha: {
//       type: DataTypes.DATE,
//       allowNull: false 
//     },
//     motivo: {
//         type: DataTypes.CHAR,
//         allowNull: false 
//     },
//     observaciones: {
//       type: DataTypes.CHAR,
//       allowNull: false
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       defaultValue: sequelize.fn('now'),
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       defaultValue: sequelize.fn('now'),
//     },
//   });
//   Jardineria.belongsTo(User, {
//     foreignKey: 'user_id',
//   });

//   Jardineria.belongsTo(Departamento, {
//     foreignKey: 'dept_id',
//   });

module.exports = {
  Jardineria
}