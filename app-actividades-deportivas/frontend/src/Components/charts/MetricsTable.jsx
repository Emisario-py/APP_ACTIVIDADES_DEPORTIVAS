import { useEffect, useState } from 'react'
import { barChartData, monthsShort } from './barChartConfig'

export default function MetricsTable () {
  const [dateRange, setDateRange] = useState('')
  const [totals, setTotals] = useState([])

  // Cargar rango de fechas que comprende la tabla de totales
  useEffect(() => {
    const today = new Date()
    const startDate = new Date()
    startDate.setDate(today.getDate() - 14)

    const startDay = startDate.getDate()
    const startMonth = monthsShort[startDate.getMonth()]
    const startYear = startDate.getFullYear()

    const endDay = today.getDate()
    const endMonth = monthsShort[today.getMonth()]
    const endYear = today.getFullYear()

    // Si los años son diferentes, incluir el año
    startYear !== endYear
      ? setDateRange(`${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`)
      : setDateRange(`${startDay} ${startMonth} - ${endDay} ${endMonth}`)

    /*     const longStartMonth = months.find(e => e[startDate.toLocaleString('es-ES', { month: 'long' })])
    const longEndMonth = months.find(e => e[monthsShort.indexOf(endMonth)])
    console.log(longStartMonth, longEndMonth) */

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

    const stats = [
      'user', // revisar si se retira este elemento
      'sport',
      'duration',
      'date',
      'startTime', // retirar elemento
      'calories',
      'rhythm',
      'series',
      'repetitions',
      'distance',
      'weight',
      'scores',
      'note' // Retirar elemento
    ]

    const filterData = () => barChartData.filter(row => dateRangeArray.includes(row.date))
    const filteredData = filterData()

    const groupTotalsBySport = (filteredData, stats) => {
      const grouped = {}

      filteredData.forEach(row => {
        const sport = row.sport
        if (!grouped[sport]) grouped[sport] = {}

        stats.forEach(stat => {
          if (typeof row[stat] === 'number') {
            grouped[sport][stat] = (grouped[sport][stat] || 0) + row[stat]
          }
        })
      })
      console.log(grouped)
      return grouped
    }

    setTotals(groupTotalsBySport(filteredData, stats))
  }, [])

  return (
    <div className='bg-gray-700 p-4 rounded-2xl shadow mt-6 h-1/2 '>
      <div className='bg-gray-900 rounded-2xl shadow flex flex-col justify-around p-4'>
        <div>
          <h2>Totales</h2>
          <p>{`${dateRange}`}</p>
        </div>
        <div>
          {Object.entries(totals).map(([sport, stats]) => (
            <div key={sport}>
              <h2>{sport}</h2>
              <ul>
                {Object.entries(stats).map(([stat, value]) => (
                  <li key={stat}>{stat}: {value}</li>
                ))}
              </ul>
            </div>))}
        </div>

      </div>
    </div>
  )
}
