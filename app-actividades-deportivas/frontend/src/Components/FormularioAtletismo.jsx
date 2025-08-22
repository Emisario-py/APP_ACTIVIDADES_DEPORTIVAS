import { useState } from 'react';

export const FormularioAtletismo = () => {

  const [estadisticas, setEstadisticas] = useState({
    distancia: '',
    tiempoMinutos: '',
    tiempoSegundos: '',
    ritmoMinutos: '',
    ritmoSegundos: '',
    frecuenciaCardiacaMedia: '',
    tiempoEntrenamientoTotal: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEstadisticas({
      ...estadisticas,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Datos capturados:", estadisticas);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Ingresa los datos de tu entrenamiento</h2>

      <fieldset>
        <legend>Datos de la Carrera</legend>
        <div>
          <label>Distancia (km):</label>
          <input type="number" name="distancia" value={estadisticas.distancia} onChange={handleInputChange} />
        </div>
        <div>
          <label>Tiempo (minutos):</label>
          <input type="number" name="tiempoMinutos" value={estadisticas.tiempoMinutos} onChange={handleInputChange} />
        </div>
        <div>
          <label>Tiempo (segundos):</label>
          <input type="number" name="tiempoSegundos" value={estadisticas.tiempoSegundos} onChange={handleInputChange} />
        </div>
        <div>
          <label>Frecuencia Cardíaca Media:</label>
          <input type="number" name="frecuenciaCardiacaMedia" value={estadisticas.frecuenciaCardiacaMedia} onChange={handleInputChange} />
        </div>
      </fieldset>
      
      <button type="submit">Guardar Datos</button>
    </form>
  );
};