import { api } from '../services/api'

export const registerRequest = (entrenamientosGuardados) => api.post('/registers', entrenamientosGuardados)
export const getRegisterRequest = () => api.get('/registers')
export const userInfoRequest = (id) => api.get('/profile', id)
export const updateInfoRequest = (updatedInfo) => api.put('/profile', updatedInfo)
