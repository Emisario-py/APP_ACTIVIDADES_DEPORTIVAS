import { useState } from 'react';

export const FormularioFutbol = () => {

  const [estadisticas, setEstadisticas] = useState({
    minutosJugados: '',
    goles: '',
    asistencias: '',
    tirosAPuerta: '',
    tirosFuera: '',
    pasesCompletados: '',
    pasesIntentados: '',
    tackles: '',
    intercepciones: '',
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
        <legend>Datos del Partido</legend>
        <div>
          <label>Minutos Jugados:</label>
          <input type="number" name="minutosJugados" value={estadisticas.minutosJugados} onChange={handleInputChange} />
        </div>
        <div>
          <label>Goles:</label>
          <input type="number" name="goles" value={estadisticas.goles} onChange={handleInputChange} />
        </div>
        <div>
          <label>Asistencias:</label>
          <input type="number" name="asistencias" value={estadisticas.asistencias} onChange={handleInputChange} />
        </div>
        <div>
          <label>Tiros a puerta:</label>
          <input type="number" name="tirosAPuerta" value={estadisticas.tirosAPuerta} onChange={handleInputChange} />
        </div>
        <div>
          <label>Tiros fuera:</label>
          <input type="number" name="tirosFuera" value={estadisticas.tirosFuera} onChange={handleInputChange} />
        </div>
        <div>
          <label>Pases completados:</label>
          <input type="number" name="pasesCompletados" value={estadisticas.pasesCompletados} onChange={handleInputChange} />
        </div>
        <div>
          <label>Pases intentados:</label>
          <input type="number" name="pasesIntentados" value={estadisticas.pasesIntentados} onChange={handleInputChange} />
        </div>
        <div>
          <label>Tackles:</label>
          <input type="number" name="tackles" value={estadisticas.tackles} onChange={handleInputChange} />
        </div>
        <div>
          <label>Intercepciones:</label>
          <input type="number" name="intercepciones" value={estadisticas.intercepciones} onChange={handleInputChange} />
        </div>
      </fieldset>

      <button type="submit">Guardar Datos</button>
    </form>
  );
};