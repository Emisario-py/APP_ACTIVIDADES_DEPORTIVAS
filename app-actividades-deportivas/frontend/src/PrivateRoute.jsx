/* import { useEffect, useState } from 'react'
import { api } from './services/api'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/profile')
        setAuth(true)
      } catch (error) {
        console.log(error)
        setAuth(false)
      }
    }
    checkAuth()
  }, [])

  return auth ? children : <Navigate to='/home' />
} */

import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  console.log('PrivateRoute user:', user) // NO LLEGA EL USER!!!

  if (loading) return <p>Cargando...</p>

  return user ? children : <Navigate to='/login' />
}
