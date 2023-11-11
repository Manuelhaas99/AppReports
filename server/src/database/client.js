const { Sequelize } = require('sequelize');

module.exports = new Sequelize('reports_db', 'postgres', '12345678', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});
