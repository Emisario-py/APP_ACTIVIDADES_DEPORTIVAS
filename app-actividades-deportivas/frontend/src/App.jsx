import Navbar from './components/Navbar'
import './App.css'
import Profile from './components/Profile'
import Metrics from './components/Metrics'

function App () {
  return (
    <>
      <Navbar />

      <main className='ml-64 min-h-screen bg-gray-800 text-gray-100 p-6'>
        <Metrics />
      </main>
    </>
  )
}

export default App
