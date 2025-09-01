// src/App.jsx
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Metrics from './components/Metrics'
import { TarjetaDeporte } from './components/TarjetaDeporte'
import { FormularioGeneral } from './components/FormularioGeneral'
import Auth from './pages/Auth'

const Dashboard = () => {
  return (
    <div className='w-full h-full'>
      <h1 className='text-3xl font-bold text-orange-500 mb-6'>
        Bienvenido a la App Deportiva
      </h1>
      <p className='text-gray-300'>
        Explora las secciones en la barra lateral para ver tu perfil, métricas y registrar actividades.
      </p>
    </div>
  )
}

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  // Función para manejar el login exitoso
  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  // Si el usuario NO está autenticado, solo mostramos la página de login
  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          {/* El componente Auth recibe la función para cambiar el estado */}
          <Route path='*' element={<Auth onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </BrowserRouter>
    )
  }

  // Si el usuario SÍ está autenticado, mostramos la aplicación principal
  return (
    <BrowserRouter>
      <Navbar />
      <main className='ml-64 min-h-screen bg-gray-800 text-gray-100 p-6'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/perfil' element={<Profile />} />
          <Route path='/deportes' element={<TarjetaDeporte />} />
          <Route path='/FormularioGeneral/:deporte' element={<FormularioGeneral />} />
          <Route path='/metricas' element={<h1>Métricas</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
