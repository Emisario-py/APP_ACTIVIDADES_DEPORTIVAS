import { useState } from 'react';

export const FormularioGeneral
 = () => {

  const [estadisticas, setEstadisticas] = useState({
    tipoDeDeporte: '',
    fecha: '',
    duraciondelEntrenamiento: '',
    frecuenciaCardiaca: '',
    calorias: '',
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
      <h2>Bienvenido</h2>

      <fieldset>
        <legend>Ingresa los datos de tu entrenamiento</legend>
        <div>
          <label>Deporte</label>
          <input type="string" name="Deporte" value={estadisticas.tipoDeDeporte} onChange={handleInputChange} />
        </div>
          <div>
          <label>Fecha</label>
          <input type="date" name="fecha" value={estadisticas.fecha} onChange={handleInputChange} />
        </div>
          <div>
          <label>Duración del entrenamiento</label>
          <input type="number" name="duracion" value={estadisticas.duraciondelEntrenamiento} onChange={handleInputChange} />
        </div>
        <div>
          <label>Frecuencia Cardíaca Media:</label>
          <input type="number" name="frecuenciaCardiacaMedia" value={estadisticas.frecuenciaCardiaca} onChange={handleInputChange} />
        </div>
        <div>
          <label>Calorias:</label>
          <input type="number" name="calorias" value={estadisticas.calorias} onChange={handleInputChange} />
        </div>
      </fieldset>
      
      <button type="submit">Guardar Datos</button>
    </form>
  );
};