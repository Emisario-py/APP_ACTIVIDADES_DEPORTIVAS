// Define la URL base de tu API. Esto permite cambiarla fácilmente en un solo lugar.
import { api } from './api'
const API_URL = 'http://localhost:3000/api'

export const register = async (username, email, password) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, email, password }), // Solo envía los campos necesarios
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`)
  }

  return res.json()
}

export const login = async (email, password) => {
  // Realiza una solicitud POST a la ruta '/login' de la API.
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Habilita la gestión de cookies para el almacenamiento de la sesión en el navegador.
    body: JSON.stringify({ email, password }), // Envía el email y la contraseña como JSON.
  })

  // Si la respuesta no es 'ok', lanza un error de "Credenciales inválidas".
  if (!res.ok) throw new Error('Credenciales inválidas')

  // Parsea la respuesta como JSON y la retorna.
  return res.json()
}

export const logout = async () => {
  // Realiza una solicitud POST a la ruta '/logout' de la API.
  await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include', // Esencial para enviar la cookie de sesión al servidor y que la invalide.
  })
}

export const userInfoRequest = async () => {
  return api.get('/profile')
}

export const logoutRequest = async () => {
  return api.post('/logout')
}
