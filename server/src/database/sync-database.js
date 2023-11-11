const sequelize = require('./client');

const syncTables = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('Tablas sincronizadas');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  syncTables,
};
