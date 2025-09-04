// src/App.jsx
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Profile from './pages/Profile.jsx'
import Metrics from './pages/Metrics.jsx'
import { TarjetaDeporte } from './pages/TarjetaDeporte.jsx'
import { FormularioGeneral } from './Components/FormularioGeneral.jsx'
import Auth from './pages/Auth'
import UserForm from './pages/UserForm.jsx'

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
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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
          <Route path='/home' element={<TarjetaDeporte />} />
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/Deportes' element={<TarjetaDeporte />} /> */}
          <Route path='/FormularioGeneral/:deporte' element={<FormularioGeneral />} />
          <Route path='/metrics' element={<Metrics />} />
          <Route path='/profile/form/user' element={<UserForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
