// Creación del provider

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
        console.log(res.data)
        setUser(res.data)
      } catch (error) {
        setUser(null)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    checkProfile()
  }, [])

  const logout = async () => {
    await logoutRequest()
    setUser(null)
  }

  useEffect(() => {
    console.log('AQui', user)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
