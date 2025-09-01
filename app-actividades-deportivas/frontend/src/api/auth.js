import { api } from '../services/api'

export const registerRequest = (entrenamientosGuardados) => api.post('/register', entrenamientosGuardados)
