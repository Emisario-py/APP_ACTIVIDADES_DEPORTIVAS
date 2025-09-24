import { api } from '../services/api'

export const registerRequest = (deporte, training) => {
  return api.post(`/registers/FormularioGeneral/${deporte}`, training)
}
export const getRegisterRequest = () => api.get('/registers')
export const userInfoRequest = () => api.get('/profile')
export const updateInfoRequest = (updatedInfo) => api.put('/profile', updatedInfo)
export const loginRequest = (user) => api.post('/login', user)
export const userRegisterRequest = (user) => api.post('/register', user)
export const logoutRequest = () => api.post('/logout')
export const getMyRegisterRequest = () => api.get('/registers/me')
