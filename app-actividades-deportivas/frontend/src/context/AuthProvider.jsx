// src/context/AuthProvider.jsx
import { useEffect, useState } from 'react'
import { logoutRequest, userInfoRequest } from '../api/auth'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await userInfoRequest()
        console.log('User info from server:', res.data)
        setUser(res.data)
      } catch (error) {
        console.log('No user session found:', error.message)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkProfile()
  }, [])

  const logout = async () => {
    try {
      await logoutRequest()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setLoading(false)
    }
  }

  // Función para actualizar el usuario (útil después del login)
  const updateUser = (userData) => {
    console.log('Updating user in context:', userData)
    setUser(userData)
  }

  // Log para debugging
  useEffect(() => {
    console.log('AuthProvider - User state changed:', user)
    console.log('AuthProvider - Loading state:', loading)
  }, [user, loading])

  const contextValue = {
    user,
    setUser: updateUser,
    loading,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
