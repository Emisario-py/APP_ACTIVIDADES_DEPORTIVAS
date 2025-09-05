// src/PrivateRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

export const PrivateRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth()

  console.log('PrivateRoute - User:', user)
  console.log('PrivateRoute - Loading:', loading)
  console.log('PrivateRoute - IsAuthenticated:', isAuthenticated)

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-800'>
        <div className='text-white text-lg'>Cargando...</div>
      </div>
    )
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!isAuthenticated) {
    console.log('PrivateRoute - Redirecting to login')
    return <Navigate to='/login' replace />
  }

  // Si todo está bien, mostrar el componente hijo
  return children
}
