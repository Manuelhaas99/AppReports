import React, { useState } from 'react';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        // Inicio de sesión exitoso, puedes redirigir al usuario a otra página.
      } else {
        // El servidor devolvió un error de autenticación, muestra un mensaje de error.
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };
  

  return (
    <form  id="contact-form" className="centered-form">
    <h1>Iniciar sesión</h1>
    <label>
      <span>Username: </span>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </label>
    <label>
      <span>Password: </span>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>
        <p>
            <button onClick={handleLogin}>Iniciar sesión</button>
        </p>
    </form>
  );
} 

export default Login;

