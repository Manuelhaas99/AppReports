const { Sequelize } = require('sequelize');


module.exports = new Sequelize('reports-db', 'postgres', '12345678', {
  host: 'localhost',
  dialect: 'postgres'
});



