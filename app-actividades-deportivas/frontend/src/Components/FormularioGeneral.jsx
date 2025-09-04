import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { registerRequest } from '../api/auth'

export const FormularioGeneral = ({ initialActivity, onClose }) => {
  const { deporte } = useParams()

  const [estadisticas, setEstadisticas] = useState({
    user: initialActivity?.user || '',
    sport: initialActivity?.sport || deporte || '',
    duration: initialActivity?.duration || '',
    date: initialActivity?.date || '',
    startTime: initialActivity?.startTime || '',
    calories: initialActivity?.calories || '',
    rhythm: initialActivity?.rhythm || '',
    series: initialActivity?.series || '',
    repetitions: initialActivity?.repetitions || '',
    distance: initialActivity?.distance || '',
    weight: initialActivity?.weight || '',
    scores: initialActivity?.scores || '',
    note: initialActivity?.note || '',
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

  const handleSubmit = async (event) => {
    event.preventDefault()

    const requiredFields = ['user', 'sport', 'duration', 'date', 'startTime']
    if (requiredFields.some((field) => !estadisticas[field])) {
      alert('Por favor, completa todos los campos requeridos.')
      return
    }

    try {
      if (actividadInicial) { // EDITAR ACTIVIDAD
        // 1. Envía los datos del entrenamiento actualizado al backend.
        const res = await updateRequest(actividadInicial.id, estadisticas)

        // 2. Muestra la respuesta del servidor en la consola.
        console.log("Editando actividad:", actividadInicial.id, estadisticas)
      } else { // CREAR ACTIVIDAD
        // 1. Envía los datos del entrenamiento al backend.
        const res = await registerRequest(deporte, estadisticas)

        // 2. Muestra la respuesta del servidor en la consola.
        console.log('Respuesta del servidor:', res)

        // 3. Actualiza el estado local solo si la petición fue exitosa.
        setEntrenamientosGuardados([...entrenamientosGuardados, estadisticas])
        setMensajeExito(true)
      }
      
      if (onClose) onClose()
    } catch (error) {
      console.error('Error al guardar el entrenamiento:', error)
      alert('Hubo un error al guardar el entrenamiento. Inténtalo de nuevo.')
    }

    // 4. Limpia el formulario después de la operación (éxito o fracaso).
    setEstadisticas((prevStats) => ({
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
  // const showWeight = false
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
    <div className='flex justify-center w-full min-h-full py-12'>
      <div className='bg-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-lg'>
        <h2 className='text-3xl font-bold text-orange-500 mb-6'>
          Bienvenido
        </h2>
        <form onSubmit={handleSubmit}>
          <fieldset className='border border-gray-600 rounded-xl p-6'>
            <legend className='text-xl font-semibold text-gray-200 px-2'>
              Ingresa los datos de tu entrenamiento de {deporte}
            </legend>

            {/* Campos del formulario */}
            <div className='grid grid-cols-1 gap-y-4 mt-4'>
              {/* Usuario */}
              <div>
                <label className='block text-sm font-medium text-gray-400 mb-1'>Usuario</label>
                <input
                  type='text'
                  name='user'
                  value={estadisticas.user}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
                  required
                />
              </div>

              {/* Deporte (campo de solo lectura) */}
              <div>
                <label className='block text-sm font-medium text-gray-400 mb-1'>Deporte</label>
                <input
                  type='text'
                  name='sport'
                  value={estadisticas.sport}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
                  readOnly
                />
              </div>

              {/* Duración */}
              <div>
                <label className='block text-sm font-medium text-gray-400 mb-1'>Duración del entrenamiento (minutos)</label>
                <input
                  type='number'
                  name='duration'
                  value={estadisticas.duration}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
                  required
                />
              </div>

              {/* Fecha */}
              <div>
                <label className='block text-sm font-medium text-gray-400 mb-1'>Fecha</label>
                <input
                  type='date'
                  name='date'
                  value={estadisticas.date}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
                  required
                />
              </div>

              {/* Hora de inicio */}
              <div>
                <label className='block text-sm font-medium text-gray-400 mb-1'>Hora de inicio</label>
                <input
                  type='time'
                  name='startTime'
                  value={estadisticas.startTime}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
                  required
                />
              </div>

              {/* Calorías */}
              <div>
                <label className='block text-sm font-medium text-gray-400 mb-1'>Calorías</label>
                <input
                  type='number'
                  name='calories'
                  value={estadisticas.calories}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
                />
              </div>

              {/* Ritmo */}
              <div>
                <label className='block text-sm font-medium text-gray-400 mb-1'>Ritmo (BPM)</label>
                <input
                  type='number'
                  name='rhythm'
                  value={estadisticas.rhythm}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
                />
              </div>
            </div>

            {/* Campos condicionales */}
            <div className='grid grid-cols-1 gap-y-4 mt-4'>
              {showSeries && (
                <div>
                  <label className='block text-sm font-medium text-gray-400 mb-1'>Series</label>
                  <input
                    type='number'
                    name='series'
                    value={estadisticas.series}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
                  />
                </div>
              )}
              {showRepetitions && (
                <div>
                  <label className='block text-sm font-medium text-gray-400 mb-1'>Repeticiones</label>
                  <input
                    type='number'
                    name='repetitions'
                    value={estadisticas.repetitions}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
                  />
                </div>
              )}
              {showDistance && (
                <div>
                  <label className='block text-sm font-medium text-gray-400 mb-1'>{getDistanceLabel()}</label>
                  <input
                    type='number'
                    name='distance'
                    value={estadisticas.distance}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
                  />
                </div>
              )}
              {showScores && (
                <div>
                  <label className='block text-sm font-medium text-gray-400 mb-1'>{getScoresLabel()}</label>
                  <input
                    type='number'
                    name='scores'
                    value={estadisticas.scores}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
                  />
                </div>
              )}
            </div>

            {/* Notas y botón */}
            <div className='mt-6'>
              <label className='block text-sm font-medium text-gray-400 mb-1'>Notas</label>
              <textarea
                name='note'
                value={estadisticas.note}
                onChange={handleInputChange}
                rows='3'
                className='w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
              />
            </div>
          </fieldset>

          <button
            type='submit'
            className='w-full mt-6 bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200'
          >
            Guardar Datos
          </button>
        </form>
        {mensajeExito && (
          <p className='mt-4 text-green-400 text-center font-bold'>
            ¡Información del entrenamiento guardada correctamente!
          </p>
        )}
      </div>
    </div>
  )
}
