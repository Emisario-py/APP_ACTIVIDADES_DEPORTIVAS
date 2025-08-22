import { useState } from 'react';

export const FormularioBasquetbol = () => {
 const [estadisticas, setEstadisticas] = useState({
    tirosDeCampoAnotados: '',
    triplesAnotados: '',
    tirosDeCampoIntentados: '',
    asistencias: '',
    perdidas: '',
    minutosJugados: '',
    robos: '',
    tapones: '',
    rebotesDefensivos: '',
    totalRebotesDefensivosEquipo: '',
  });

  // 2. Estados para los resultados calculados
  const [resultados, setResultados] = useState({
    eFG: null,
    astToRatio: null,
    robosPorMinuto: null,
    taponesPorMinuto: null,
    drb: null,
  });

  // 3. Manejar los cambios en cualquier input del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEstadisticas({
      ...estadisticas,
      [name]: value === '' ? '' : parseFloat(value),
    });
  };

  // 4. Manejar el envío del formulario y calcular las métricas
  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      tirosDeCampoAnotados,
      triplesAnotados,
      tirosDeCampoIntentados,
      asistencias,
      perdidas,
      minutosJugados,
      robos,
      tapones,
      rebotesDefensivos,
      totalRebotesDefensivosEquipo,
    } = estadisticas;

    // Calcular Porcentaje de Tiro Efectivo (eFG%)
    let eFG = null;
    if (tirosDeCampoIntentados > 0) {
      eFG = ((tirosDeCampoAnotados + 0.5 * triplesAnotados) / tirosDeCampoIntentados * 100).toFixed(2);
    }

    // Calcular Relación Asistencias/Pérdidas
    let astToRatio = null;
    if (perdidas > 0) {
      astToRatio = (asistencias / perdidas).toFixed(2);
    } else if (asistencias > 0) {
      astToRatio = 'Infinito'; // Maneja el caso de 0 pérdidas
    }

    // Calcular Robos y Tapones por minuto
    let robosPorMinuto = null;
    let taponesPorMinuto = null;
    if (minutosJugados > 0) {
      robosPorMinuto = (robos / minutosJugados).toFixed(2);
      taponesPorMinuto = (tapones / minutosJugados).toFixed(2);
    }

    // Calcular Tasa de Rebote Defensivo (DRB%)
    let drb = null;
    if (totalRebotesDefensivosEquipo > 0) {
      drb = (rebotesDefensivos / totalRebotesDefensivosEquipo * 100).toFixed(2);
    }

    // Actualizar el estado con los resultados
    setResultados({
      eFG,
      astToRatio,
      robosPorMinuto,
      taponesPorMinuto,
      drb,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Ingresa los datos de tu entrenamiento</h2>
      <fieldset>
        <div>
          <label>Duración del entrenamiento </label>
          <input type="number" name="duracionEntrenamiento" value={estadisticas} onChange={handleInputChange} />
        </div>
      </fieldset>  
      <fieldset>
        <legend>Métricas Ofensivas</legend>
        <div>
          <label>Tiros de campo anotados:</label>
          <input type="number" name="tirosDeCampoAnotados" value={estadisticas.tirosDeCampoAnotados} onChange={handleInputChange} />
        </div>
        <div>
          <label>Triples anotados:</label>
          <input type="number" name="triplesAnotados" value={estadisticas.triplesAnotados} onChange={handleInputChange} />
        </div>
        <div>
          <label>Tiros de campo intentados:</label>
          <input type="number" name="tirosDeCampoIntentados" value={estadisticas.tirosDeCampoIntentados} onChange={handleInputChange} />
        </div>
        <div>
          <label>Asistencias:</label>
          <input type="number" name="asistencias" value={estadisticas.asistencias} onChange={handleInputChange} />
        </div>
        <div>
          <label>Pérdidas de balón:</label>
          <input type="number" name="perdidas" value={estadisticas.perdidas} onChange={handleInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <legend>Métricas Defensivas</legend>
        <div>
          <label>Minutos jugados:</label>
          <input type="number" name="minutosJugados" value={estadisticas.minutosJugados} onChange={handleInputChange} />
        </div>
        <div>
          <label>Robos:</label>
          <input type="number" name="robos" value={estadisticas.robos} onChange={handleInputChange} />
        </div>
        <div>
          <label>Tapones:</label>
          <input type="number" name="tapones" value={estadisticas.tapones} onChange={handleInputChange} />
        </div>
        <div>
          <label>Rebotes defensivos propios:</label>
          <input type="number" name="rebotesDefensivos" value={estadisticas.rebotesDefensivos} onChange={handleInputChange} />
        </div>
        <div>
          <label>Total de rebotes defensivos del equipo:</label>
          <input type="number" name="totalRebotesDefensivosEquipo" value={estadisticas.totalRebotesDefensivosEquipo} onChange={handleInputChange} />
        </div>
      </fieldset>
      
      <button type="submit">Calcular Métricas</button>

      {/* 5. Mostrar los resultados si se han calculado */}
      {resultados.eFG !== null && (
        <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
          <h3>Resultados de tu rendimiento:</h3>
          <p><strong>Porcentaje de Tiro Efectivo (eFG%):</strong> {resultados.eFG}%</p>
          <p><strong>Relación Asistencias/Pérdidas:</strong> {resultados.astToRatio}</p>
          <p><strong>Robos por minuto:</strong> {resultados.robosPorMinuto}</p>
          <p><strong>Tapones por minuto:</strong> {resultados.taponesPorMinuto}</p>
          <p><strong>Tasa de Rebote Defensivo (DRB%):</strong> {resultados.drb}%</p>
        </div>
      )}
    </form>
  );
};

