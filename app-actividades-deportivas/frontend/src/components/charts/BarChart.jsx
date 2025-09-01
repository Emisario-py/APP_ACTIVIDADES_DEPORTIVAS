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
import { barChartData, monthsWithDays } from './barChartConfig.js'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    const selectedMonthLabel = monthsWithDays.find(row => row.month === props.month.toLowerCase())
    const labels = selectedMonthLabel ? selectedMonthLabel.days : []
    const filteredDataByMonth = barChartData.filter(row => row.month === props.month.toLowerCase())

    const categoryMap = {
      duration: { key: 'duration', label: 'Duración' },
      calories: { key: 'calories', label: 'Calorías' },
      distance: { key: 'distance', label: 'Distancia' }
    }

    const { key, label } = categoryMap[props.dataCategory] || categoryMap.duration

    const arr = labels.map(day => {
      const found = filteredDataByMonth.find(row => row.day === day)
      return found ? found[key] : 0
    })

    setCurrentDataCategory(label)
    setFilteredDataArray(arr)
    setLabels(labels)
  }, [props.month, props.dataCategory])

  console.log(filteredDataArray)

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
