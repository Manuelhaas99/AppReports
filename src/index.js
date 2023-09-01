const express = require('express')
const sequelize = require('./database/client.js');
const { User } = require('./models/user.js')
const { Tickets } = require ('./models/tickets.js');
const { Visitas } = require('./models/visitas.js');
const { Departamento } = require('./models/departamento.js');
const { Pool } = require('pg');
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

// app.get('/user', async (req, res) => {
//   try {
//     const { username } = req.query;
//     const usernameId = await sequelize.query(
//       'SELECT user_id from users where username = $3',
//       [username]
//     );
//     // console.log(usernameId);
//     // const allTodos = await pool.query(
//     //   'SELECT * from todos where userid = $1',
//     //   [usernameId.rows[0].id]
//     // );
//     // res.json(allTodos.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(400);
//     res.json({ message: `${err.message}` });
//   }
// });

app.get('/user', async (req, res) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.post('/user', async (req, res) => {
  try {
    const { user_id, password, email, departamentoId, username, fecha, rol} = req.body;
    const newUser = await User.create({
      user_id,
      password,
      email,
      departamentoId,
      username,
      fecha,
      rol,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// app.post('/user', async (req, res) => {
//   try {
//     const { userId, password, email, departamentoId, nombre, fecha, rol} = req.body;
//     const newUser = await pool.query(
//       'INSERT INTO Users (userId, departamentoId, nombre, password, fecha, email, rol, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, to_timestamp($6), to_timestamp($7))',
//       [userId, departamentoId, nombre, password, fecha, email, rol]
//     );
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });
// app.delete("/user", async(req,res) =>{
//   try {
//       const { user_id } = req.body;
//       const deleteUser = await sequelize.query("DELETE from users WHERE user_id = $1", [user_id]);
//       res.json(deleteUser);
//   }catch (err) {
//       console.error(err.message);
//       res.status(400)
//       res.json({message: `${err.message}` })
//   }
// });

app.delete("/user", async(req,res) =>{
  try {
      const { user_id } = req.body;
      const deleteObj = await sequelize.query("DELETE from users WHERE user_id = 1", [user_id]);
      res.json(deleteObj);
  }catch (err) {
      console.error(err.message);
      res.status(400)
      res.json({message: `${err.message}` })
  }
});

app.put("/user", async(req,res) =>{
  try {
     
      const { user_id } = req.body;
      const updaterow = await sequelize.query("UPDATE users SET username = 'Isaak' WHERE user_id = 1", [user_id]);
      res.json(updaterow);
  } catch (err) {
      console.error(err.message);
      res.status(400)
      res.json({message: `${err.message}` })
  }

});

// app.delete("/user", async(req,res) =>{
//   try {
//       const { userId } = req.body;
//       const deleteUser = await User.destroy ("DELETE from todos WHERE id = $1", [userId]);
//       res.json(deleteUser);
//   }catch (err) {
//       console.error(err.message);
//       res.status(400)
//       res.json({message: `${err.message}` })
//   }
// });

// Usuario.eliminarPorId = async function(userId) {
//   try {
//     const numDeleted = await this.destroy({
//       where: {
//         id: userId
//       }
//     });
//     return numDeleted;
//   } catch (error) {
//     throw new Error(`Error al eliminar el usuario con ID ${id}: ${error.message}`);
//   }
// };

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

