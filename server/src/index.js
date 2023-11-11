const express = require('express');
const cors = require('cors');
// const { User } = require('./models/user.js');
// const { Jardineria } = require('./models/jardineria.js');
// const { PlantasElectricas } = require('./models/plantasElectricas.js');
// const { Seguridad } = require('./models/seguridad');
const { syncTables } = require('./database/sync-database.js');
const userRoutes = require('./routes/user.js');

const app = express();

app.use(cors({ origin: 'http://localhost:4000' }));
app.use(express.json());

syncTables();

// app.post('/jardineria', async (req, res) => {
//   try {
//     const { dept_id, user_id, status, observaciones, motivo, fecha } = req.body;

// const newJardineria = await Jardineria.create({ dept_id, user_id, status, observaciones, motivo, fecha })

//     res.status(201).json(newJardineria);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Error en el servidor. '})
//   }
// });

// app.get('/jardineria', async (req, res) => {
//   try {
//     // Consulta todos los tickets en la base de datos utilizando Sequelize
//     const jardineria = await Jardineria.findAll();

//     // Devuelve los tickets como respuesta en formato JSON
//     res.json(jardineria);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Error en el servidor' });
//   }
// });

// app.post('/jardineria', async (req, res) => {
//   try {
//     const { nombre, area, observaciones, vistobueno } = req.body;

//     const newJardineria = await Jardineria.create({
//       nombre,
//       area,
//       observaciones,
//       vistobueno,
//     });

//     res.status(201).json(newJardineria);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Error en el servidor. ' });
//   }
// });

// //-----------------------------Plantas electricas-------------------------

// app.post('/plantasElectricas', async (req, res) => {
//   try {
//     const { plantas_id, observaciones, motivo, nombre, equipo, firma } =
//       req.body;

//     const newPlantaElectrica = await PlantasElectricas.create({
//       plantas_id,
//       motivo,
//       nombre,
//       observaciones,
//       equipo,
//       firma,
//     });

//     res.status(201).json(newPlantaElectrica);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Error en el servidor. ' });
//   }
// });

// //----------------------------Seguridad-----------------------------------------

// app.post('/seguridad', async (req, res) => {
//   try {
//     const {
//       seguridad_id,
//       entrada,
//       salida,
//       nombre,
//       institucion,
//       motivo,
//       firma,
//     } = req.body;

//     const newSeguridad = await Seguridad.create({
//       seguridad_id,
//       entrada,
//       salida,
//       nombre,
//       institucion,
//       motivo,
//       firma,
//     });

//     res.status(201).json(newSeguridad);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Error en el servidor. ' });
//   }
// });

// //---------------------------Login-----------------------
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   // Realizar una consulta a la base de datos para verificar las credenciales
//   const user = await User.findOne({ where: { username, password } });

//   if (user) {
//     // Credenciales válidas, el usuario existe
//     // Aquí puedes generar un token de autenticación o crear una sesión
//     // y enviar una respuesta exitosa al cliente.
//     res.status(200).json({ message: 'Inicio de sesión exitoso' });
//   } else {
//     // Credenciales inválidas, el usuario no existe o la contraseña es incorrecta
//     res.status(401).json({ message: 'Credenciales inválidas' });
//   }
// });

// app.post('/user', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const newUser = await User.create({ email, password });

//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Error en el servidor. ' });
//   }
// });

app.use('/user', userRoutes);

// TODO agregar mas informacion del servidor - HORA, RAM, CPU, ETC
app.get('/isActive', (req, res) => {
  res.send('Servidor funcionando');
});

app.listen(3000, () => {
  console.log('Servidor en ejecución en http://localhost:3000');
});
