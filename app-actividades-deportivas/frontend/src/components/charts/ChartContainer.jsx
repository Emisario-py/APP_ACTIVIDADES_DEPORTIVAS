import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import BarChart from './BarChart.jsx'
import { months } from './barChartConfig.js'

export default function ChartContainer () {
  const [currentMonth, setCurrentMonth] = useState('')
  const [monthPosition, setMonthPosition] = useState(null)
  const [currentDataCategory, setCurrentDataCategory] = useState('duration')

  // Cargar currentMonth y currentYear
  useEffect(() => {
    const date = new Date()
    const currentMonth = date.toLocaleString('es-ES', { month: 'long' })
    const capitalCurrentMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1) // Mayúscula en la primera letra para buscar en el array
    /* const currentYear = date.toLocaleString('es-ES', { year: 'long' }) */
    setCurrentMonth(capitalCurrentMonth)
    setMonthPosition(months.indexOf(capitalCurrentMonth))
  }, [])

  /* console.log(currentMonth)
  console.log(monthPosition) */

  // Cambio de mes con botones
  const handleChangeMonth = (direction) => {
    const totalMonths = months.length
    const newIndex =
    direction === 'left'
      ? (monthPosition - 1 + totalMonths) % totalMonths
      : (monthPosition + 1) % totalMonths

    setMonthPosition(newIndex)
    setCurrentMonth(months[newIndex])
  }

  // Cambio de tipo de dato
  const handleChangeDataCategory = (type) => {
    setCurrentDataCategory(type)
  }

  return (
    <div className='bg-gradient-to-r from-orange-500/60 via-amber-500/60 to-orange-500/60 p-2 rounded-2xl shadow mt-2 flex flex-col justify-around h-1/2'>
      <div className='bg-slate-950 rounded-2xl flex shadow p-4'>
        <button
          className='w-1/5 flex justify-center'
          onClick={() => handleChangeMonth('left')}
        > <ArrowLeft />
        </button>
        <h2
          className='w-3/5 text-center font-semibold'
        >{currentMonth}
        </h2>
        <button
          className='w-1/5 flex justify-center'
          onClick={() => handleChangeMonth('right')}
        > <ArrowRight />
        </button>
      </div>
      <div className='bg-slate-950 rounded-2xl shadow flex flex-col mt-4 h-full'>
        <div className='pt-2 flex justify-around'>
          <button
            onClick={() => handleChangeDataCategory('duration')}
            className={`rounded-2xl p-2 m-2 text-sm font-medium ${currentDataCategory === 'duration'
              ? 'bg-orange-500'
              : 'bg-gray-700 hover:bg-orange-500'
            }`}
          >
            Duración
          </button>
          <button
            onClick={() => handleChangeDataCategory('calories')}
            className={`rounded-2xl p-2 m-2 text-sm font-medium ${currentDataCategory === 'calories'
              ? 'bg-orange-500'
              : 'bg-gray-700 hover:bg-orange-500'
            }`}
          >
            Calorías
          </button>
          <button
            onClick={() => handleChangeDataCategory('distance')}
            className={`rounded-2xl p-2 m-2 text-sm font-medium ${currentDataCategory === 'distance'
              ? 'bg-orange-500'
              : 'bg-gray-700 hover:bg-orange-500'
            }`}
          >
            Distancia
          </button>
        </div>
        <BarChart month={currentMonth} year='2025' dataCategory={currentDataCategory} />
      </div>
    </div>
  )
}
