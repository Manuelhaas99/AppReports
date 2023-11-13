import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      // Verifica si los campos de email y contraseña están vacíos
      if (!email || !password) {
        alert('Por favor, complete todos los campos.');
        return;
      }

      // Verifica si el campo de email es un correo electrónico válido
      if (!isEmailValid(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
      }

      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log({ response, data });

      if (response.ok) {
        if (data.status === 'WARN') {
          toast({
            title: data.message,
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: data.message,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }

        // Puedes redirigir al usuario a otra página (por ejemplo, la página de inicio de sesión) aquí
      } else {
        const data = await response.json();
        console.log(data); // Imprimir el objeto completo en la consola
        // Muestra el mensaje de error específico
      }
    } catch (error) {
      console.error('Se produjo un error:', error.message);
    }
  };

  return (
    <form
      id='contact-form'
      className='centered-form'
      onSubmit={(e) => handleLogin(e)}
    >
      <h1>Registro de sesión</h1>
      <label>
        <span>Email: </span>
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
      <p>
        <button type='submit'>Registrarse</button>
      </p>
    </form>
  );
}

export default Registro;
