import { api } from '../services/api'

export const registerRequest = (deporte, training) => {
  return api.post(`/registers/FormularioGeneral/${deporte}`, training)
}
