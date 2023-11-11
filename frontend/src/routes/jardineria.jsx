import { Form } from "react-router-dom";
import React, { useState, handleSubmit, handleInputChange, handleCancelClick } from 'react';


export default function Jardineria() {

  const [formData, setFormData] = useState({  nombre: '', area: '', observaciones: '', vistobueno: '' });
 


  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.area || !formData.observaciones || !formData.vistobueno) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    // solicitud Fetch 
    fetch('http://localhost:3000/jardineria', {
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
      setFormData({ nombre: '', area: '', observaciones: '', vistobueno: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelClick = () => {
    // Restablece el estado del formulario
    setFormData({ nombre: '', area: '', observaciones: '', vistobueno: '' });
  };

  return (
    <form method="post" id="contact-form" className="centered-form" onSubmit={handleFormSubmit}>
    <h1>Jardineria</h1>
    <label>
      <span>Nombre</span>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleInputChange}
        placeholder="Ingrese el nombre"
        style={{ width: "491px" }}
      />
    </label>
    <label>
      <span>Descripción</span>
      <textarea
        name="observaciones"
        rows={8}
        value={formData.observaciones}
        onChange={handleInputChange}
        placeholder="Ingrese una descripción"
        style={{ width: "491px" }} // Aquí se usa un objeto de estilo
      />
    </label>
    <label>
      <span>Area</span>
      <textarea
        name="area"
        rows={8}
        value={formData.area}
        onChange={handleInputChange}
        placeholder="Ingrese un area"
        style={{ width: "491px", height: "77px" }} // Aquí se usa un objeto de estilo
      />
    </label>
    <label>
      <span>visto bueno</span>
      <textarea
        name="vistobueno"
        rows={8}
        placeholder="Ingrese el visto bueno"
        value={formData.vistobueno}
        onChange={handleInputChange}
        style={{ width: "491px", height: "77px" }} // Aquí se usa un objeto de estilo
      />
    </label>
    <p>
      <button type="submit">Save</button>
      <button type="button" onClick={handleCancelClick}>Cancel</button>
    </p>
  </form>
  );
}