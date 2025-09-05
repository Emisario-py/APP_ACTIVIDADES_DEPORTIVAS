// src/components/Logout.jsx
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Llama a la función de cierre de sesión al cargar el componente
    logout()
    // Redirige al usuario al componente de autenticación (Auth)
    navigate('/login')
  }, [logout, navigate])

  return (
    <div className='flex justify-center items-center h-screen'>
      <p>Cerrando sesión...</p>
    </div>
  )
}

export default Logout
