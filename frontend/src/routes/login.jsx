import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data && data.userToken) {
        // Inicio de sesión exitoso, puedes redirigir al usuario a otra página.
        console.log({ data });
        window.sessionStorage.setItem('SESSION_TOKEN', data.userToken);
        navigate('/homepage');
      } else {
        // El servidor devolvió un error de autenticación, muestra un mensaje de error.
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  React.useEffect(() => {
    const sessionToken = window.sessionStorage.getItem('SESSION_TOKEN');
    if (sessionToken) {
      navigate('/homepage');
    }
  }, [navigate]);

  return (
    <form
      id='contact-form'
      className='centered-form'
      onSubmit={(e) => handleLogin(e)}
    >
      <h1>Iniciar sesión</h1>
      <label>
        <span>Username: </span>
        <input
          type='text'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Password: </span>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <Button type='submit'>Iniciar sesión</Button>
    </form>
  );
}

export default Login;
