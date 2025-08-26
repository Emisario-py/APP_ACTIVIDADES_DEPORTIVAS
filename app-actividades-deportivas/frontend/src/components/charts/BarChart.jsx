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
import { barChartData } from './barChartConfig.js'

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
  const filteredData = barChartData.filter(row => row.month === props.month.toLowerCase())
  console.log(filteredData, props.month.toLowerCase())

  const barChartConfig = {
    type: 'bar',
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
    data: {

      labels: filteredData.map(row => row.day),
      datasets: [{
        label: 'Tiempo de entrenamiento',
        data: filteredData.map(row => row.time),
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        backgroundColor: '#f97316',
      }]
    }
  }

  return (
    <div>
      <Bar data={barChartConfig.data} />
    </div>
  )
}
