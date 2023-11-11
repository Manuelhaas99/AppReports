// config.js
const Sequelize = require('sequelize');
const pkg = require('pg');
const { Pool } = pkg;

const sequelize = new Sequelize('reports-db', 'postgres', '123456789', {
  host: 'localhost', // o la dirección IP de tu servidor de base de datos
  port: 5432, // Puerto por defecto de PostgreSQL
  dialect: 'postgres',
});



const pool = new Pool({
  host: 'localhost',
  database: 'reports-db',
  password: '123456789',
  port: 5432,
});

module.exports = sequelize;
module.exports = {
    pool
}