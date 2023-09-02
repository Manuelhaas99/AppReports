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

app.get('/user', async (req, res) => {
  try {
    const { username } = req.query;

    // Obtener el usuario directamente en una consulta
    const userQuery = await sequelize.query(
      'SELECT * FROM users WHERE username = :username',
      {
        replacements: { username },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (userQuery.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Obtener todos los usuarios con el mismo username
    const allUsersQuery = await sequelize.query(
      'SELECT * FROM users WHERE username = :username',
      {
        replacements: { username: userQuery[0].username },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(allUsersQuery);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

// app.get('/user', async (req, res) => {
//   try {
//     const { username } = req.query;

//     // Obtener el usuario directamente en una consulta
//     const userQuery = await sequelize.query(
//       'SELECT * FROM users WHERE username = $1',
//       {
//         bind: [username],
//         type: sequelize.QueryTypes.SELECT,
//       }
//     );

//     if (userQuery.length === 0) {
//       return res.status(404).json({ message: 'Usuario no encontrado.' });
//     }

//     // Obtener todos los usuarios con el mismo username
//     const allUsersQuery = await sequelize.query(
//       'SELECT * FROM users WHERE username = $1',
//       {
//         bind: [userQuery[0].username],
//         type: sequelize.QueryTypes.SELECT,
//       }
//     );

//     res.json(allUsersQuery);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Error en el servidor.' });
//   }
// });

app.post('/user', async (req, res) => {
  try {
    const { user_id, departamento_id, username, password,  email, fecha, rol} = req.body;

    // Crea un nuevo usuario en la base de datos
    const newUser = await sequelize.query(
      'INSERT INTO users (user_id, departamento_id, username,  password, fecha, email, rol ) VALUES ( :user_id,  :departamento_id, :username, :password, :fecha, :email , :rol)',
      {
        replacements: { user_id, departamento_id, username,  password, fecha, email, rol }, // Proporciona los valores para los marcadores de posición :username y :email
        type: sequelize.QueryTypes.INSERT, // Especifica el tipo de consulta como INSERT
      }
    );
    const insertedUser = await sequelize.query(
      'SELECT * FROM users WHERE user_id = :user_id',
      {
        replacements: { user_id }, // Proporciona el valor de user_id
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.status(201).json(insertedUser[0]);;
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

// app.post('/user', async (req, res) => {
//   try {
//       const {user_id, username, password, email, rol, fecha} = req.query;

//       // Crear un nuevo usuario en la Base de datos
//       const newUser = await User.create({
//         user_id,
//         username,
//         password,
//         email,
//         rol, 
//         fecha
//       });
//       const newUserQuery = await sequelize.query(
//         'INSERT INTO todos (user_id, username, password, email, rol, fecha) VALUES ($1, $2, $3, $4, $5, to_timestamp($6))',
//         [newUser.rows[0].user_id, username, password, email, rol, fecha]
//       );
//  res.status(201).json(newUser);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Error en el servidor.' });
//   }
  
// });


// app.post('/user', async (req, res) => {
//   try {
//     const { user_id, password, email, departamentoId, username, fecha, rol} = req.body;
//     const newUser = await User.create({
//       user_id,
//       password,
//       email,
//       departamentoId,
//       username,
//       fecha,
//       rol,
//     });
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });
 
// app.post('/user', async (req, res) => {
//   try {
//     const { user_id, password, email, departamentoId, username, fecha, rol, createdAt, updatedAt} = req.body;
//     const newUser = await sequelize.query(
//       'INSERT INTO users (user_id, departamentoId, username, password, fecha, email, rol, createdAt, updatedAt) VALUES (:user_id, departamentoId, :username, :password, :fecha, :email, :rol, :createdAt, :updatedAt)',
//       [user_id.rows[0], departamentoId, username, password, fecha, email, rol, createdAt, updatedAt]
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

