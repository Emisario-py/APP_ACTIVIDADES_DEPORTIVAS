import { useState } from 'react';

export const FormularioGimnasio = () => {
  // Estado para los datos de entrada
  const [estadisticas, setEstadisticas] = useState({
    pesoCorporal: '',
    pesoLevantado: '',
    repeticiones: '',
    series: '',
    tiempoDescanso: '',
    caloriasConsumidas: '',
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
        <legend>Datos de Rendimiento</legend>
        <div>
          <label>Peso Corporal (kg):</label>
          <input type="number" name="pesoCorporal" value={estadisticas.pesoCorporal} onChange={handleInputChange} />
        </div>
        <div>
          <label>Peso Levantado (kg):</label>
          <input type="number" name="pesoLevantado" value={estadisticas.pesoLevantado} onChange={handleInputChange} />
        </div>
        <div>
          <label>Repeticiones:</label>
          <input type="number" name="repeticiones" value={estadisticas.repeticiones} onChange={handleInputChange} />
        </div>
        <div>
          <label>Series:</label>
          <input type="number" name="series" value={estadisticas.series} onChange={handleInputChange} />
        </div>
        <div>
          <label>Tiempo de Descanso (segundos):</label>
          <input type="number" name="tiempoDescanso" value={estadisticas.tiempoDescanso} onChange={handleInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <legend>Datos Adicionales</legend>
        <div>
          <label>Calorías Consumidas (diarias):</label>
          <input type="number" name="caloriasConsumidas" value={estadisticas.caloriasConsumidas} onChange={handleInputChange} />
        </div>
      </fieldset>
      
      <button type="submit">Guardar Datos</button>
    </form>
  );
};