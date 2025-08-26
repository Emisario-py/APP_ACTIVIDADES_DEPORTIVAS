import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import BarChart from './BarChart.jsx'

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

export default function ChartContainer () {
  const [currentMonth, setCurrentMonth] = useState('')
  const [monthPosition, setMonthPosition] = useState(null)

  // Cargar currentMonth y currentYear
  useEffect(() => {
    const date = new Date()
    const currentMonth = date.toLocaleString('es-ES', { month: 'long' })
    const capitalCurrentMotnh = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1) // Mayúscula en la primera letra para buscar en el array
    /* const currentYear = date.toLocaleString('es-ES', { year: 'long' }) */
    setCurrentMonth(capitalCurrentMotnh)
    setMonthPosition(months.indexOf(capitalCurrentMotnh))
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

  return (
    <div className='bg-gray-700 p-6 rounded-2xl shadow mt-6 flex flex-col justify-around h-1/2'>
      <div className='bg-gray-900 rounded-2xl shadow flex justify-around p-4'>
        <button onClick={() => handleChangeMonth('left')}> <ArrowLeft /> </button>
        <div>
          <p>{currentMonth}</p>
        </div>
        <button onClick={() => handleChangeMonth('right')}> <ArrowRight /> </button>
      </div>
      <div className='bg-gray-900 rounded-2xl shadow flex justify-around p-4 mt-4 h-5/6'>
        <BarChart month={currentMonth} year='2025' />
      </div>

    </div>
  )
}
