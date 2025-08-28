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

console.log(barChartData)

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

  useEffect(() => {
    const selectedMonthLabel = monthsWithDays.find(row => row.month === props.month.toLowerCase())
    const labels = selectedMonthLabel ? selectedMonthLabel.days : []
    const filteredData = barChartData.filter(row => row.month === props.month.toLowerCase())

    const arr = labels.map(day => {
      const found = filteredData.find(row => row.day === day)
      return found ? found.time : 0
    })
    setFilteredDataArray(arr)
    setLabels(labels)
  }, [props.month])

  console.log(filteredDataArray)

  const barChartConfig = {
    type: 'bar',
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Duración'
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
