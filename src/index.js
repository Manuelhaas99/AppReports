const express = require('express')
const sequelize = require('./database/client.js');
const { User } = require('./models/user.js')
const { Tickets } = require ('./models/tickets.js');
const { Visitas } = require('./models/visitas.js');
const { Departamento } = require('./models/departamento.js');
const { Op } = require("sequelize");
const app = express()
const port = 3000

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
// sincronizar();

app.get('/user', async (req, res) => {
  try {
    const { username } = req.query;

    // Obtener el usuario directamente en una consulta
    const user = await User.findOne({ where: { username }})

    if (user === null) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});


app.post('/user', async (req, res) => {
  try {
    const { departamento_id, username, password,  email, fecha, rol} = req.body;

    // Crea un nuevo usuario en la base de datos
    const newUser = await User.create({ departamento_id, username, password, email, fecha, rol })
    
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});



  
app.delete('/user', async (req, res) => {
  try {

    const {  user_id  } = req.body;
    const user = await User.findOne({ where: { user_id }})
    if (user === null) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    await User.destroy({
      where: {
        user_id: user_id
      }
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});





app.put("/user", async(req,res) =>{
  try {
    
    const {  user_id , username } = req.body;
    const user = await User.findOne({ where: { user_id }})
    if (user === null) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
      await User.update({ username }, {
      where: {
        user_id: user_id,
      }
    });
    
    const updatedUser = await User.findByPk(user_id);
      res.status(201).json(updatedUser);
  } catch (err) {
      console.error(err.message);
      res.status(400)
      res.json({message: `${err.message}` })
  }

});



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

