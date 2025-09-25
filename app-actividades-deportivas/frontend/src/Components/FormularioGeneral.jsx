import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { registerRequest } from '../api/auth'
import { Pencil, ClipboardList } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export const FormularioGeneral = ({ initialActivity, onClose }) => {
  const { deporte } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCancel = () => {
    if (onClose) {
      onClose()         // Cerrar modal (Perfil)
    } else {
      navigate('/home') // Redirigir (Home)
    }
  }

  const [estadisticas, setEstadisticas] = useState({
    user: initialActivity?.user || user.username || '',
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
    userID: initialActivity?.userID || user.id || ''
  })

  const [entrenamientosGuardados, setEntrenamientosGuardados] = useState([])
  const [mensajeExito, setMensajeExito] = useState(false)

  useEffect(() => {
    const baseState = {
      user: user.username || '',
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
      userID: user.id || '',
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
      const res = await registerRequest(deporte, estadisticas)

      console.log('Respuesta del servidor:', res)

      // 3. Actualiza el estado local solo si la petición fue exitosa.
      setEntrenamientosGuardados([...entrenamientosGuardados, estadisticas])
      setMensajeExito(true)

      if (onClose) onClose()
    } catch (error) {
      console.error('Error al guardar el entrenamiento:', error)
      alert('Hubo un error al guardar el entrenamiento. Inténtalo de nuevo.')
    }

    setEstadisticas((prevStats) => ({
      user: prevStats.user,
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
      userID: prevStats.userID
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
    if (deporte === 'Natación') return 'Distancia (m)'
    if (deporte === 'Atletismo') return 'Distancia (km)'
    return 'Distancia'
  }

  return (
    <div className='flex justify-center w-full min-h-full py-12'>
      <div className='bg-gradient-to-r from-orange-400/30 to-orange-500/30 p-8 rounded-2xl shadow-2xl w-full max-w-lg'>
        <h2 className="text-3xl font-semibold mb-6 flex justify-center items-center">
          <span className="bg-gradient-to-r from-orange-500/90 via-amber-500/90 to-orange-500/90 bg-clip-text text-transparent">
            {initialActivity ? 'Editar actividad' : 'Registrar actividad'}
          </span>

          {initialActivity ? (
            <Pencil
              size={18}
              className="ml-3"
              style={{ stroke: "url(#gradient)" }}
            />
          ) : (
            <ClipboardList
              size={18}
              className="ml-3"
              style={{ stroke: "url(#gradient)" }}
            />
          )}

          {/* Definición del degradado */}
          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </svg>
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
                  className='w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
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
                  className='w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
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
                  className='w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
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
                  className='w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
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
                  className='w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
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
                  className='w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
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
                  className='w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
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
                    className='w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
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
                    className='w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
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
                    className='w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
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
                    className='w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
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
                className='w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500'
              />
            </div>
          </fieldset>

          <div className='flex justify-around mt-8'>
            <button
              type='submit'
              className='px-6 py-3 bg-white/30 border text-white font-bold py-2 rounded-lg hover:bg-orange-500 hover:border-orange-500 transition-colors duration-200 border-white/50'
            >
              Guardar
            </button>

            <button
              type='button'
              onClick={handleCancel}
              className="px-6 py-3 bg-red-500/30 border text-white font-bold py-2 rounded-lg hover:bg-red-500 transition-colors duration-200 border-red-500/40"
            >
              Cancelar
            </button>
          </div>

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
