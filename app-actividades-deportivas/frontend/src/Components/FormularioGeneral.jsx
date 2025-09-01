import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const FormularioGeneral = () => {
  const { deporte } = useParams()

  const [estadisticas, setEstadisticas] = useState({
    user: '',
    sport: '',
    duration: '',
    date: '',
    startTime: '',
    calories: '',
    rhythm: '',
    series: '',
    repetitions: '',
    distance: '',
    weight: '',
    scores: '',
    note: '',
  })

  const [entrenamientosGuardados, setEntrenamientosGuardados] = useState([])
  const [mensajeExito, setMensajeExito] = useState(false)

  useEffect(() => {
    const baseState = {
      user: '',
      sport: deporte || '',
      duration: '',
      date: '',
      startTime: '',
      calories: '',
      rhythm: '',
      series: '',
      repetitions: '',
      distance: '',
      weight: '',
      scores: '',
      note: '',
    }

    switch (deporte) {
      case 'Basquetbol':
      case 'Futbol':
        setEstadisticas({
          ...baseState,
          series: '',
          repetitions: '',
          distance: '',
          weight: '',
        })
        break
      case 'Gymnasio':
        setEstadisticas({
          ...baseState,
          distance: '',
          weight: '',
          scores: '',
        })
        break
      case 'Atletismo':
      case 'Natación':
        setEstadisticas({
          ...baseState,
          series: '',
          repetitions: '',
          weight: '',
          scores: '',
        })
        break
      default:
        setEstadisticas(baseState)
    }
  }, [deporte])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEstadisticas({
      ...estadisticas,
      [name]: value,
    })

    if (mensajeExito) {
      setMensajeExito(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const requiredFields = ['user', 'sport', 'duration', 'date', 'startTime']
    if (requiredFields.some(field => !estadisticas[field])) {
      alert('Por favor, completa todos los campos requeridos.')
      return
    }

    setEntrenamientosGuardados([...entrenamientosGuardados, estadisticas])
    setMensajeExito(true)

    console.log('Nuevo entrenamiento guardado:', estadisticas)
    console.log('Todos los entrenamientos guardados:', entrenamientosGuardados)

    setEstadisticas(prevStats => ({
      user: '',
      sport: prevStats.sport,
      duration: '',
      date: '',
      startTime: '',
      calories: '',
      rhythm: '',
      series: '',
      repetitions: '',
      distance: '',
      weight: '',
      scores: '',
      note: '',
    }))
  }

  const showSeries = deporte === 'Gymnasio'
  const showRepetitions = deporte === 'Gymnasio'
  const showDistance = deporte === 'Atletismo' || deporte === 'Natación'
  const showWeight = false
  const showScores = deporte === 'Basquetbol' || deporte === 'Futbol'

  const getScoresLabel = () => {
    if (deporte === 'Basquetbol') return 'Canastas'
    if (deporte === 'Futbol') return 'Goles'
    return 'Puntuación'
  }

  const getDistanceLabel = () => {
    if (deporte === 'Natación') return 'Distancia (mts)'
    if (deporte === 'Atletismo') return 'Distancia (km)'
    return 'Distancia'
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <h2>Bienvenido</h2>
        <fieldset>
          <legend>Ingresa los datos de tu entrenamiento de {deporte}</legend>
          <div>
            <label>Usuario</label>
            <input
              type='text'
              name='user'
              value={estadisticas.user}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Deporte</label>
            <input
              type='text'
              name='sport'
              value={estadisticas.sport}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div>
            <label>Duración del entrenamiento (minutos)</label>
            <input
              type='number'
              name='duration'
              value={estadisticas.duration}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Fecha</label>
            <input
              type='date'
              name='date'
              value={estadisticas.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Hora de inicio</label>
            <input
              type='time'
              name='startTime'
              value={estadisticas.startTime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Calorías</label>
            <input
              type='number'
              name='calories'
              value={estadisticas.calories}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Ritmo (BPM)</label>
            <input
              type='number'
              name='rhythm'
              value={estadisticas.rhythm}
              onChange={handleInputChange}
            />
          </div>

          {showSeries && (
            <div>
              <label>Series</label>
              <input
                type='number'
                name='series'
                value={estadisticas.series}
                onChange={handleInputChange}
              />
            </div>
          )}

          {showRepetitions && (
            <div>
              <label>Repeticiones</label>
              <input
                type='number'
                name='repetitions'
                value={estadisticas.repetitions}
                onChange={handleInputChange}
              />
            </div>
          )}

          {showDistance && (
            <div>
              <label>{getDistanceLabel()}</label>
              <input
                type='number'
                name='distance'
                value={estadisticas.distance}
                onChange={handleInputChange}
              />
            </div>
          )}

          {showWeight && (
            <div>
              <label>Peso (kg)</label>
              <input
                type='number'
                name='weight'
                value={estadisticas.weight}
                onChange={handleInputChange}
              />
            </div>
          )}

          {showScores && (
            <div>
              <label>{getScoresLabel()}</label>
              <input
                type='number'
                name='scores'
                value={estadisticas.scores}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div>
            <label>Notas</label>
            <textarea
              name='note'
              value={estadisticas.note}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <button type='submit'>Guardar Datos</button>
      </form>
      {mensajeExito && (
        <p style={{ color: 'green', fontWeight: 'bold', textAlign: 'center' }}>
          ¡Información del entrenamiento guardada correctamente!
        </p>
      )}
    </div>
  )
}
