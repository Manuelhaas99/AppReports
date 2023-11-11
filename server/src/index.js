const express = require('express')
const sequelize = require('./database/client');
const { User } = require('./models/user.js')
const { Tickets } = require ('./models/tickets.js');
const { Visitas } = require('./models/visitas.js');
const { Departamento } = require('./models/departamento.js');
const { Jardineria } = require('./models/jardineria.js');
const { PlantasElectricas } = require('./models/plantasElectricas.js');
const { Seguridad } = require('./models/seguridad');
const { where } = require('sequelize');
const app = express()
const port = 3000
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { postUser } = require ('./routes/auth') ;

 // Monta las rutas de autenticación en '/auth'

// Otras configuraciones y rutas de la aplicación


// const { login } = require('./controllers/authController.js');
// app.use('/auth', authRoutes);

app.use(cors({ origin: 'http://localhost:4000' }));
app.use(express.json());

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const createUserTable = async () => {
  try {
    await User.sync();
    console.log('Tabla creada o actualizada si no existía.');
  } catch (error) {
    console.error('Error:', error);
  }
}

const createDepartamentoTable = async () => {
  try{
    await Departamento.sync();
    console.log('Tabla creada o actualizada si no existía.');
  } catch (error) {
    console.error('Error:', error);
  }
}

const createTicketTable = async () => {
  try{
    await Tickets.sync();
    console.log('Tabla creada o actualizada si no existía.');
  } catch (error) {
    console.error('Error:', error);
  }
}

const createVisitasTable = async () => {
    try{
      await Visitas.sync();
      console.log('Tabla creada o actualizada si no existía.');
    } catch(error){
      console.error('Error:', error);
    }
}

const createJardineriaTable = async () => {
  try{
    await Jardineria.sync();
    console.log('Tabla creada o actualizada si no existía.');
  } catch(error){
    console.error('Error:', error);
  }
}

const createPlantasElectricasTable = async () => {
  try{
    await PlantasElectricas.sync();
    console.log('Tabla creada o actualizada si no existía.');
  } catch(error){
    console.error('Error:', error);
  }
}

const createSeguridadTable = async () => {
  try{
    await Seguridad.sync();
    console.log('Tabla creada o actualizada si no existía.');
  } catch(error){
    console.error('Error:', error);
  }
}

// const sincronizar = async () =>{
//   try{
//     await Tickets.sync({ force: true });
//     console.log("All models were synchronized successfully.");
//   } catch{
//     console.error('No funciono alv:', error);
//   }

// }


initializeDatabase();
createUserTable();
createDepartamentoTable();
createTicketTable();
createVisitasTable();
createJardineriaTable();
createPlantasElectricasTable();
createSeguridadTable();
// sincronizar();

sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });


  // ESTO es solo para admins
// metodos para la tabla users.
// app.get('/user', async (req, res) => {
//   try {
//     // agregar check para detectar que es admin, sino lo es, regresar error
//     const { username } = req.query;

//     // Obtener el usuario directamente en una consulta
//     const user = await User.findOne({ where: { username }})

//     if (user === null) {
//       return res.status(404).json({ message: 'Usuario no encontrado.' });
//     }

//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Error en el servidor.' });
//   }
// });

// //
// app.post('/user', async (req, res) => {
//   try {
//     const { dept_id, username, password,  email, fecha, rol} = req.body;

//     // TODO password necesita estar hasheada

//     // Crea un nuevo usuario en la base de datos
//     const newUser = await User.create({ dept_id, username, password, email, fecha, rol })
    
//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Error en el servidor.' });
//   }
// });

// app.delete('/user', async (req, res) => {
//   try {

//     const { user_id } = req.body;

//     const user = await User.findOne({ where: { user_id } })
//     if (user === null) {
//       return res.status(404).json({ message: 'Usuario no encontrado. '})
//     }

//     await User.destroy({
//       where: {
//         user_id: user_id
//       }
//     });
//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Error en el servidor.' })
//   }
// });

// app.put("/user", async(req,res) =>{
//   try {
    
//     const {  user_id , username } = req.body;
//     const user = await User.findOne({ where: { user_id }})
//     if (user === null) {
//       return res.status(404).json({ message: 'Usuario no encontrado.' });
//     }
//       await User.update({ username }, {
//       where: {
//         user_id: user_id,
//       }
//     });
    
//     const updatedUser = await User.findByPk(user_id);
//       res.status(201).json(updatedUser);
//   } catch (err) {
//       console.error(err.message);
//       res.status(400)
//       res.json({message: `${err.message}` })
//   }

// });


// Metodos para la tabla departamentos
app.get('/departamento', async (req, res) => {
  try {
    const { nombre } = req.query;

    const departamento = await Departamento.findOne({ where: { nombre }})
    if(departamento === null){
      return res.status(404).json ({ message: 'Departamentos no encontrado. '})
    }

    res.json(departamento)
  } catch(err) {
    console.error(err.message)
    res.status(500).json({ message: 'Error en el servidor. '})
  }
});

app.post('/departamento', async (req, res) => {
  try {
    const { dept_id, nombre, descripcion } = req.body;

    const newDept = await Departamento.create({ dept_id, nombre, descripcion })

    res.status(201).json(newDept);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor. '})
  }
});

app.delete('/departamento', async (req, res) => {
  try {

    const { dept_id } = req.body;

    const departamento = await Departamento.findOne({ where: { dept_id } })
    if (departamento === null) {
      return res.status(404).json({ message: 'Departamento no encontrado. '})
    }

    await Departamento.destroy({
      where: {
        dept_id: dept_id
      }
    });
    res.status(201).json(departamento);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor.' })
  }
});

app.put("/departamento", async(req, res) => {
  try {

    const { dept_id, nombre, descripcion } = req.body;
    const departamento = await Departamento.findOne({ where: { nombre }});
    if ( departamento === null){
      return res.status(404).json ({ message: 'Departamento no encontrado. '})
    }
    await departamento.update({ nombre, descripcion}, {
      where: {
        dept_id: dept_id
      }
    });
    
    const updateDept = await Departamento.findByPk(dept_id);
    res.status(201).json(updateDept)
  } catch (error) {
    console.error(err.message);
    res.status(400)
    res.json({message: `${err.message}`})
  }

});

// Se debe añadir logica para detectar el usuario, el id del usuario
// investigar JWT- JSON web tokens
app.get('/tickets', async (req, res) => {
  try {
    const { ticket_id } = req.query;

    const tickets = await Tickets.findOne({ where: { ticket_id }})
    if(tickets === null){
      return res.status(404).json ({ message: 'Ticket no encontrado. '})
    }

    res.json(tickets)
  } catch(err) {
    console.error(err.message)
    res.status(500).json({ message: 'Error en el servidor. '})
  }
});

app.post('/tickets', async (req, res) => {
  try {
    const { user_id, dept_id, status, fecha, observaciones, area } = req.body;

    const newTicket = await Tickets.create({  dept_id, user_id, status, fecha, observaciones, area })

    res.status(201).json(newTicket);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor. '})
  }
});

app.delete('/tickets', async (req, res) => {
  try {

    const { ticket_id } = req.body;

    const tickets= await Tickets.findOne({ where: { ticket_id } })
    if (tickets === null) {
      return res.status(404).json({ message: 'Ticket no encontrado. '})
    }

    await Tickets.destroy({
      where: {
        ticket_id: ticket_id
      }
    });
    res.status(201).json(tickets);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor.' })
  }
});

app.put("/tickets", async(req, res) => {
  try {

    const {  ticket_id, status, fecha, observaciones, area } = req.body;
    const tickets = await Tickets.findOne({ where: { ticket_id }});
    if ( tickets === null){
      return res.status(404).json ({ message: 'Ticket no encontrado. '})
    }
    await tickets.update({ status, observaciones, fecha, area}, {
      where: {
        ticket_id: ticket_id
      }
    });
    
    const updateTicket = await Tickets.findByPk(ticket_id);
    res.status(201).json(updateTicket)
  } catch (err) {
    console.error(err.message);
    res.status(400)
    res.json({message: `${err.message}`})
  }

});



//-----------------------------Visitas----------------------------------------------



app.post('/visitas', async (req, res) => {
  try {
    const { visitas_id, user_id, fecha, institucion, motivo } = req.body;

    const newVisita = await Visitas.create({ visitas_id, user_id, fecha, institucion, motivo })

    res.status(201).json(newVisita);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor. '})
  }
});





//-----------------------Jardineria--------------------------------

// app.post('/jardineria', async (req, res) => {
//   try {
//     const { dept_id, user_id, status, observaciones, motivo, fecha } = req.body;

//     const newJardineria = await Jardineria.create({ dept_id, user_id, status, observaciones, motivo, fecha })

//     res.status(201).json(newJardineria);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Error en el servidor. '})
//   }
// });

app.get('/jardineria', async (req, res) => {
  try {
    // Consulta todos los tickets en la base de datos utilizando Sequelize
    const jardineria = await Jardineria.findAll();

    // Devuelve los tickets como respuesta en formato JSON
    res.json(jardineria);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});



app.post('/jardineria', async (req, res) => {
  try {
    const { nombre, area, observaciones, vistobueno } = req.body;

    const newJardineria = await Jardineria.create({ nombre, area, observaciones, vistobueno })

    res.status(201).json(newJardineria);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor. '})
  }
});

//-----------------------------Plantas electricas-------------------------

app.post('/plantasElectricas', async (req, res) => {
  try {
    const { plantas_id, observaciones, motivo, nombre, equipo, firma } = req.body;

    const newPlantaElectrica = await PlantasElectricas.create({ plantas_id, motivo, nombre, observaciones, equipo, firma })

    res.status(201).json(newPlantaElectrica);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor. '})
  }
});

//----------------------------Seguridad-----------------------------------------

app.post('/seguridad', async (req, res) => {
  try {
    const { seguridad_id, entrada, salida, nombre, institucion, motivo, firma } = req.body;

    const newSeguridad = await Seguridad.create({ seguridad_id, entrada, salida, nombre, institucion, motivo, firma })

    res.status(201).json(newSeguridad);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor. '})
  }
});


//---------------------------Login-----------------------
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Realizar una consulta a la base de datos para verificar las credenciales
  const user = await User.findOne({ where: { username, password } });

  if (user) {
    // Credenciales válidas, el usuario existe
    // Aquí puedes generar un token de autenticación o crear una sesión
    // y enviar una respuesta exitosa al cliente.
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } else {
    // Credenciales inválidas, el usuario no existe o la contraseña es incorrecta
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

//--------------------------Registro-----------------------------------


app.post('/user', async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = await User.create({ email, password })

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor. '})
  }
});






//TODO agregar mas informacion del servidor - HORA, RAM, CPU, ETC
app.get('/isActive', (req, res) => {
  res.send('Servidor funcionando')
})

app.listen(3000, () => {
  console.log('Servidor en ejecución en http://localhost:3000');
});

