import ChartContainer from '../components/charts/ChartContainer'
import MetricsTable from '../components/charts/MetricsTable'

export default function Metrics() {
  return (
    <>
      <div className='h-full'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-50 mb-2'>
            ¿Cómo va tu progreso?
          </h1>
          <p className='text-slate-400'>Mide tu rendimiento visualizando tu evolución en el tiempo</p>
        </div>
        <ChartContainer />
        <MetricsTable />
      </div>
    </>
  )
}
