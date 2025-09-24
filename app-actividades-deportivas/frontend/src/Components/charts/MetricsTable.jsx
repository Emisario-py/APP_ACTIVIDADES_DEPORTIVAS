import { useEffect, useState } from 'react'
import { monthsShort } from './barChartConfig'
import { getMyRegisterRequest, getRegisterRequest } from '../../api/auth'

// Array base para los estadísticos a mostrar en esta sección con el nombre del key de los datos, la palabra en español para mostrar y el ícono a usar
const stats = [
  { stat: 'duration', esp: 'Duración', icon: '⏱️' },
  { stat: 'calories', esp: 'Calorías', icon: '🔥' },
  { stat: 'rhytm', esp: 'Frecuencia Cardiaca', icon: '💓' },
  { stat: 'series', esp: 'Series', icon: '🔁' },
  { stat: 'repetitions', esp: 'Repeticiones', icon: '🔄️' },
  { stat: 'distance', esp: 'Distancia', icon: '📏' },
  { stat: 'weight', esp: 'Peso', icon: '🏋️‍♂️' },
  { stat: 'scores', esp: 'Puntos', icon: '🏆' },
]

export default function MetricsTable () {
  const [dateRange, setDateRange] = useState('')
  const [totals, setTotals] = useState([])
  const [filteredData, setFilteredData] = useState([])

  // Cargar rango de fechas que comprende la tabla de totales
  useEffect(() => {
    getTableInfo()
  }, [])

  const getTableInfo = async () => {
    const today = new Date()
    const startDate = new Date()
    startDate.setDate(today.getDate() - 14)

    // Fecha de inicio
    const startDay = startDate.getDate()
    const startMonth = monthsShort[startDate.getMonth()]
    const startYear = startDate.getFullYear()

    // Fecha final (hoy)
    const endDay = today.getDate()
    const endMonth = monthsShort[today.getMonth()]
    const endYear = today.getFullYear()

    // Si los años son diferentes, incluir el año
    startYear !== endYear
      ? setDateRange(`${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`)
      : setDateRange(`${startDay} ${startMonth} - ${endDay} ${endMonth}`)

    // Array de fechas a tomar en cuenta en el resumen
    const createDateRangeArray = () => {
      const arr = []
      for (let i = 0; i <= 14; i++) {
        const date = new Date()
        date.setDate(today.getDate() - i)
        const day = date.getDate().toString().padStart(2, '0')
        const month = date.getMonth() + 1 // Obtiene el mes (0-11) y le suma 1
        const formatMonth = month.toString().padStart(2, '0') // Asegura dos dígitos, añadiendo un '0' al inicio si es necesario
        const year = date.getFullYear()
        const el = `${year}-${formatMonth}-${day}`
        arr.unshift(el)
      }
      return arr
    }
    const dateRangeArray = createDateRangeArray()

    const getData = async () => {
      try {
        const res = await getMyRegisterRequest()
        return res
      } catch (error) {
        console.log(error)
      }
    }
    const data = await getData()
    console.log(data)

    // Filtramos datos por fechas a cosniderar
    const filterData = () => data.data.filter(row => dateRangeArray.includes(row.date))
    const filteredData = filterData()

    // Objeto con suma de datos obtenidos para cada deporte separado por tipo de dato
    const groupTotalsBySport = (filteredData, stats) => {
      const grouped = {}

      filteredData.forEach(row => {
        const sport = row.sport
        console.log(sport)
        if (!grouped[sport]) grouped[sport] = {}

        stats.forEach(stat => {
          if (typeof row[stat.stat] === 'number') {
            grouped[sport][stat.esp] = (grouped[sport][stat.esp] || 0) + row[stat.stat]
          }
        })
      })
      return grouped
    }

    setTotals(groupTotalsBySport(filteredData, stats))
    setFilteredData(filteredData)
  }

  // Color para punto marcador de deporte
  const getSportColor = (sport) => {
    const colors = {
      Natación: 'bg-blue-500',
      Atletismo: 'bg-green-500',
      Gymnasio: 'bg-purple-500',
      Basquetbol: 'bg-red-500',
      Futbol: 'bg-pink-500'
    }
    return colors[sport] || 'bg-orange-500'
  }

  // Selección de ícono para el tipo de estadístico
  const getStatIcon = statName => {
    const statObj = stats.find(s => s.esp === statName)
    return statObj ? statObj.icon : ''
  }

  return (
    <div className='bg-gray-700 p-4 rounded-2xl shadow mt-6 h-1/2 mb-2'>
      <div className='bg-gray-900 rounded-2xl shadow h-full flex flex-col overflow-hidden'>

        {/* Título */}
        <div className='text-center p-4 border-b border-gray-700 flex-shrink-0'>
          <h2 className='text-xl font-bold text-white mb-1'>📈 Resumen de Actividad</h2>
          <p className='text-gray-400 text-sm font-medium'>{dateRange}</p>
        </div>

        {/* Contenido */}
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
          {Object.entries(totals).map(([sport, stats]) => (
            <div key={sport} className='bg-gray-800 rounded-xl p-4 border border-gray-600 hover:border-gray-500 transition-colors'>

              {/* Título del deporte */}
              <div className='flex items-center mb-3'>
                <div className={`w-3 h-3 rounded-full ${getSportColor(sport)} mr-3`} />
                <h3 className='text-lg font-bold text-white'>{sport}</h3>
              </div>

              {/* Estdísticos totales del deporte */}
              <div className='grid grid-cols-1 gap-2'>
                {Object.entries(stats).map(([stat, value]) => (
                  <div key={stat} className='flex items-center justify-between p-2 bg-gray-700 rounded-lg'>
                    <div className='flex items-center'>
                      <span className='text-lg mr-2'>{getStatIcon(stat)}</span>
                      <span className='text-gray-300 font-medium'>{stat}</span>
                    </div>
                    <span className='text-white font-bold'>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Resumen general (Deportes, Sesiones, Calorías totales) */}
        <div className='p-4 border-t border-gray-700 flex-shrink-0'>
          <div className='grid grid-cols-3 gap-4 text-center'>
            <div className='bg-gray-800 rounded-lg p-2'>
              <div className='text-sm text-gray-400'>Deportes</div>
              <div className='text-lg font-bold text-white'>{Object.keys(totals).length}</div>
            </div>
            <div className='bg-gray-800 rounded-lg p-2'>
              <div className='text-sm text-gray-400'>Sesiones</div>
              <div className='text-lg font-bold text-white'>{filteredData.length}</div>
            </div>
            <div className='bg-gray-800 rounded-lg p-2'>
              <div className='text-sm text-gray-400'>Total Cal.</div>
              <div className='text-lg font-bold text-white'>{Object.entries(totals).reduce((acc, [/* sport */, stats]) => {
                return acc + (stats['Calorías'] || 0)
              }, 0)}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
