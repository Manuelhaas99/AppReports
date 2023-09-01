const { DataTypes } = require('sequelize');
const sequelize = require('../database/client.js');
const { User } = require('./user.js');



const Visitas = sequelize.define('visitas', {
    user_id:{
        type:DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    institucion:{
        type: DataTypes.CHAR,
        allowNull: false
    },
    motivo:{
        type: DataTypes.CHAR,
        allowNull: false
    }
})

Visitas.belongsTo(User, {
    foreignKey: 'user_id',
  });

module.exports = {
    Visitas
}