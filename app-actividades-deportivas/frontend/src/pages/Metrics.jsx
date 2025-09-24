import ChartContainer from '../Components/charts/ChartContainer'
import MetricsTable from '../Components/charts/MetricsTable'

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
