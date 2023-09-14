async function createUser(req, res){
    try {
        const {user_id, dept_id, nombre, fecha, email, rol  } =req.body;
        const newUser = await User.create({
          user_id,
          dept_id,
          nombre,
          fecha,
          email,
          rol,
        });
        res.status(201).json(newUser);
    } catch (error){
        res.status(500).json({ error: 'Error creating user'});
    }
  }
  
  module.exports = {
    createUser,
  };