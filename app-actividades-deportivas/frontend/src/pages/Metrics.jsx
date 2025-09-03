import ChartContainer from '../components/charts/ChartContainer'
import MetricsTable from '../components/charts/MetricsTable'

export default function Metrics () {
  return (
    <>
      <div className='h-full'>
        <ChartContainer />
        <MetricsTable />
      </div>
    </>
  )
}
