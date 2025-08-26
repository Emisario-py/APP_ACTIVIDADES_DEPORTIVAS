import { useState } from 'react';

export const FormularioGeneral = () => {

  const [estadisticas, setEstadisticas] = useState({
    tipoDeDeporte: '',
    fecha: '',
    duraciondelEntrenamiento: '',
    frecuenciaCardiaca: '',
    calorias: '',
  });

  const [entrenamientosGuardados, setEntrenamientosGuardados] = useState([]);

  const [mensajeExito, setMensajeExito] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEstadisticas({
      ...estadisticas,
      [name]: value,
    });

    if (mensajeExito) {
      setMensajeExito(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    if (Object.values(estadisticas).some(x => x === '')) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }


    setEntrenamientosGuardados([...entrenamientosGuardados, estadisticas]);

    setEstadisticas({
      tipoDeDeporte: '',
      fecha: '',
      duraciondelEntrenamiento: '',
      frecuenciaCardiaca: '',
      calorias: '',
    });

    setMensajeExito(true);

    console.log("Nuevo entrenamiento guardado:", estadisticas);
    console.log("Todos los entrenamientos guardados:", entrenamientosGuardados);
  };



  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <h2>Bienvenido</h2>
        <fieldset>
          <legend>Ingresa los datos de tu entrenamiento</legend>
          <div>
            <label>Deporte</label>
            <input
              type="string"
              name="tipoDeDeporte"
              value={estadisticas.tipoDeDeporte}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Fecha</label>
            <input
              type="date"
              name="fecha"
              value={estadisticas.fecha}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Duración del entrenamiento</label>
            <input
              type="number"
              name="duraciondelEntrenamiento"
              value={estadisticas.duraciondelEntrenamiento}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Frecuencia Cardíaca Media:</label>
            <input
              type="number"
              name="frecuenciaCardiaca"
              value={estadisticas.frecuenciaCardiaca}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Calorías:</label>
            <input
              type="number"
              name="calorias"
              value={estadisticas.calorias}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <button type="submit">Guardar Datos</button>
      </form>
      {/* Mensaje de éxito */}
      {mensajeExito && (
        <p style={{ color: 'green', fontWeight: 'bold', textAlign: 'center' }}>
          ¡Información del entrenamiento guardada correctamente!
        </p>
      )}
    </div>
  );
};