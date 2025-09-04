// src/App.jsx
import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Profile from './pages/Profile.jsx'
import Metrics from './pages/Metrics.jsx'
import { TarjetaDeporte } from './pages/TarjetaDeporte.jsx'
import { FormularioGeneral } from './Components/FormularioGeneral.jsx'
import Auth from './pages/Auth'
import UserForm from './pages/UserForm.jsx'
import { useAuth } from './context/AuthContext.jsx'
import { PrivateRoute } from './PrivateRoute.jsx'
import { Register } from './pages/Register.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'

const AppContent = () => {
  useAuth()
  const location = useLocation()
  const hideNavbarRoutes = ['/login', '/']

  // Si la ruta es /login o no reconocida, no muestra la Navbar
  const showNavbar = !hideNavbarRoutes.includes(location.pathname)
  return (
    <>
      {showNavbar && <Navbar />}
      <main className={`${showNavbar ? 'ml-64' : 'min-h-screen bg-gray-800 text-gray-100 p-6'}`}>

        <Routes>
          {/* El componente Auth recibe la función para cambiar el estado */}
          <Route path='/login' element={<Auth />} />
          <Route path='*' element={<Auth />} />
          <Route path='/register' element={<Register />} />

          <Route
            path='/home'
            element={
              <PrivateRoute>
                <TarjetaDeporte />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path='/metrics'
            element={
              <PrivateRoute>
                <Metrics />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile/form/user'
            element={
              <PrivateRoute>
                <UserForm />
              </PrivateRoute>
            }
          />
          <Route
            path='/FormularioGeneral/:deporte'
            element={
              <PrivateRoute>
                <FormularioGeneral />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </>
  )
}

export const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </AuthProvider>
)
