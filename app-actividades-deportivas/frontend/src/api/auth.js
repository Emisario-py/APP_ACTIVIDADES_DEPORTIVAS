import { api } from '../services/api'

export const registerRequest = (entrenamientosGuardados) => api.post('/registers', entrenamientosGuardados)
export const getRegisterRequest = () => api.get('/registers')
