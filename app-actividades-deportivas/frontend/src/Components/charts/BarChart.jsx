import {
  Chart as
  ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { monthsCode, monthsWithDays } from './barChartConfig.js'
import { useCallback, useEffect, useState } from 'react'
import { getMyRegisterRequest, getRegisterRequest } from '../../api/auth.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function BarChart (props) {
  const [filteredDataArray, setFilteredDataArray] = useState([])
  const [labels, setLabels] = useState([])
  const [currentDataCategory, setCurrentDataCategory] = useState('')

  const getChartData = useCallback(async () => {
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

    const selectedMonthLabel = monthsWithDays.find(row => row.month === props.month.toLowerCase()) // Obtiene días para el eje X
    const labels = selectedMonthLabel ? selectedMonthLabel.days : []
    const monthObj = monthsCode.find(row => Object.keys(row)[0] === props.month) // Obtiene el mes: codigo para el mes seleccionado
    const monthCode = monthObj ? Object.values(monthObj)[0] : null // Obtiene código del mes
    const filteredDataByMonth = data.data.filter(row => row.date.slice(5, 7) === monthCode) // Comparo con el string de date guardado extrayendo los dos dígitos del mes

    // Objeto para nombrar el eje Y
    const categoryMap = {
      duration: { key: 'duration', label: 'Duración' },
      calories: { key: 'calories', label: 'Calorías' },
      distance: { key: 'distance', label: 'Distancia' }
    }

    const { key, label } = categoryMap[props.dataCategory] || categoryMap.duration // Depende de categoría seleccionada, sino, Duración

    // Obtiene valor correspondiente al día
    const arr = labels.map(day => {
      const found = filteredDataByMonth.filter(row => Number(row.date.slice(8, 10)) === day)
      // Si hay más de un dato en el día, los suma. sino hay datos, es 0
      const foundSum = found.reduce((acc, stat) => acc + stat[key], 0)
      return foundSum
    })

    setCurrentDataCategory(label)
    setFilteredDataArray(arr)
    setLabels(labels)
  }, [props])

  useEffect(() => {
    getChartData()
  }, [getChartData])

  const barChartConfig = {
    type: 'bar',
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: currentDataCategory
          }
        },
        x: {
          title: {
            display: true,
            text: 'Días'
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1.5,
      plugins: {
        legend: {
          display: false,
        }
      }
    },
    data: {
      labels,
      datasets: [{
        data: filteredDataArray,
        barPercentage: 0.5,
        barThickness: 4,
        maxBarThickness: 8,
        minBarLength: 0,
        backgroundColor: '#f97316',
      }]
    }
  }

  return (
    <div className='w-full h-full pb-6 pt-4 px-10 flex justify-center'>
      <Bar data={barChartConfig.data} options={barChartConfig.options} />
    </div>
  )
}
