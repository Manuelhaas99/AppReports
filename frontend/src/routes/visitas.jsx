import { Form } from "react-router-dom";
import React, { useState, handleSubmit } from 'react';


export default function Visitas() {
  const [formData, setFormData] = useState({ motivo: '', observaciones: '' });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // solicitud Fetch 
    fetch('http://localhost:3000/visitas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la solicitud');
        }
      })
      .then(data => {
        console.log('Datos del servidor:', data);
        // Muestra un mensaje de éxito
        alert('Los datos se guardaron correctamente.');
      })
      .catch(error => {
        // Maneja errores
        console.error('Error:', error);
  
        // muestra el mensaje de error en la interfaz de usuario
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = 'Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo.';
      });
      setFormData({ motivo: '', observaciones: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelClick = () => {
    // Restablece el estado del formulario
    setFormData({ motivo: '', observaciones: '' });
  };

  return (
    <Form method="post" id="contact-form"  className="centered-form">
      <h1>Visitas</h1>
     
      <label>
        <span>Motivo del problema</span>
        <input
          type="text"
          name="motivo"
          placeholder="Ingrese el motivo"
          style={{ width: "491px" }}
        />
      </label>
      <label>
        <span>Descripcion</span>
        <textarea
          name="descripcion"
          rows={8}
          placeholder="Ingrese una descripcion"
          style={{ width: "491px" }}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}