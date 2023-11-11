import { Form } from "react-router-dom";
import React, { useState, handleSubmit, handleInputChange, handleCancelClick,} from 'react';

export default function Seguridad() {
  const [formData, setFormData] = useState({ entrada: '', salida: '', nombre: '', institucion: '', motivo: '', firma: '' });
  const horaEntrada = formData.entrada;
  const horaSalida = formData.salida;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Verifica que todos los campos requeridos estén completos
    if (!horaEntrada || !horaSalida || !formData.nombre || !formData.institucion || !formData.motivo || !formData.firma) {
      alert('Por favor, completa todos los campos.');
      return; // No enviar datos si algún campo está vacío
    }

    if (horaEntrada >= horaSalida) {
      alert('La hora de salida debe ser posterior a la hora de entrada');
      return; // No enviar datos si la hora de salida no es válida
    }

    // solicitud Fetch 
    fetch('http://localhost:3000/Seguridad', {
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
        setFormData({ entrada: '', salida: '', nombre: '', institucion: '', motivo: '', firma: '' });
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
    setFormData({ entrada: '', salida: '', nombre: '', institucion: '', motivo: '', firma: '' });
  };
  
  return (
    <form method="post" id="contact-form" className="centered-form" onSubmit={handleFormSubmit}>
      <h1>Seguridad</h1>
      <label>
        <span>Nombre</span>
        <textarea
          name="nombre"
          rows={8}
          value={formData.nombre}
          onChange={handleInputChange}
          placeholder="Ingrese el nombre"
          style={{ width: "491px", height: "40px" }} // Aquí se usa un objeto de estilo
        />
      </label>
      <label>
        <span>Institucion</span>
        <textarea
          name="institucion"
          rows={8}
          placeholder="Ingresa la institucion"
          value={formData.institucion}
          onChange={handleInputChange}
          style={{ width: "491px", height: "77px" }} // Aquí se usa un objeto de estilo
        />
      </label>
      <label>
        <span>Motivo</span>
        <textarea
          name="motivo"
          rows={8}
          placeholder="Ingresa los motivos"
          value={formData.motivo}
          onChange={handleInputChange}
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
      <label>
        <span>Hora de entrada</span>
        <input
           type="time"
           name="entrada"
           value={formData.entrada}
           onChange={handleInputChange}
        />
      </label>
      <label>
        <span>Hora de salida</span>
        <input
           type="time"
           name="salida"
           value={formData.salida}
           onChange={handleInputChange}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </p>
    </form>
  );
}