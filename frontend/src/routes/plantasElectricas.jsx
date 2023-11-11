import { Form } from "react-router-dom";
import React, { useState, handleSubmit, handleInputChange, handleCancelClick,} from 'react';


export default function PlantasElectricas() {

  const [formData, setFormData] = useState({ nombre: '', observaciones: '', equipo: '', firma: '' });

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.nombre || !formData.area || !formData.observaciones || !formData.vistobueno) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    
    // solicitud Fetch 
    fetch('http://localhost:3000/PlantasElectricas', {
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
  
        // Restablece el estado del formulario después de que la solicitud se completa con éxito
        setFormData({ nombre: '', observaciones: '', equipo: '', firma: '' });
      })
      .catch(error => {
        // Maneja errores
        console.error('Error:', error);
  
        // muestra el mensaje de error en la interfaz de usuario
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = 'Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo.';
      });
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelClick = () => {
    // Restablece el estado del formulario
    setFormData({ nombre: '', observaciones: '', equipo: '', firma: '' });
  };

  return (
    <form method="post" id="contact-form" className="centered-form" onSubmit={handleFormSubmit}>
      <h1>Plantas Electricas</h1>
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
        <span>Equipo</span>
        <textarea
          name="equipo"
          rows={8}
          value={formData.equipo}
          onChange={handleInputChange}
          placeholder="Ingrese un equipo"
          style={{ width: "491px", height: "77px" }} // Aquí se usa un objeto de estilo
        />
      </label>
      <label>
        <span>Firma</span>
        <textarea
          name="firma"
          rows={8}
          placeholder="Departamento que firma"
          value={formData.firma}
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
