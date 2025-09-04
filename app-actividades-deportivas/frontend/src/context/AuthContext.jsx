import { createContext, useContext } from 'react'

// Creación del contexto
export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)
