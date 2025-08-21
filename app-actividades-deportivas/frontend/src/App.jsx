import { useState } from 'react'
import Navbar from './components/Navbar'
import Perfil from './components/Perfil'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />

      <main className="ml-64 min-h-screen bg-gray-800 text-gray-100 p-6">
        <Perfil />
      </main>
    </>
  )
}

export default App
