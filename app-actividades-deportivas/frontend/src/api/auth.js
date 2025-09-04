import { api } from '../services/api'

export const registerRequest = (deporte, training) => {
  return api.post(`/registers/FormularioGeneral/${deporte}`, training)
}
export const getRegisterRequest = () => api.get('/registers')
export const userInfoRequest = (id) => api.get('/profile', id)
export const updateInfoRequest = (updatedInfo) => api.put('/profile', updatedInfo)
