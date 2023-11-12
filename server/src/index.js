const express = require('express');
const cors = require('cors');
const { syncTables } = require('./database/sync-database.js');
const userRoutes = require('./routes/user.js');
const jardineriaRoutes = require('./routes/jardineria.js');
const plantasElectricasRoutes = require('./routes/plantasElectricas.js');
const seguridadRoutes = require('./routes/seguridad.js');
const loginRoutes = require('./routes/login.js');

const app = express();

app.use(cors({ origin: 'http://localhost:4000' }));
app.use(express.json());

syncTables();

app.use('/user', userRoutes);
app.use('/jardineria', jardineriaRoutes);
app.use('/plantas-electricas', plantasElectricasRoutes);
app.use('/seguridad', seguridadRoutes);
app.use('login', loginRoutes);

// TODO agregar mas informacion del servidor - HORA, RAM, CPU, ETC
app.get('/isActive', (req, res) => {
  res.send('Servidor funcionando');
});

app.listen(3000, () => {
  console.log('Servidor en ejecución en http://localhost:3000');
});
