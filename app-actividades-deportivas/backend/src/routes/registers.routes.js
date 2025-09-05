import { Router } from 'express'
import Registro from '../models/register.model.js'

const router = Router()

// Crear registro
router.post('/FormularioGeneral/:deporte', async (req, res) => {
  const nuevoRegistro = new Registro(req.body)
  await nuevoRegistro.save()
  res.json(nuevoRegistro)
})

// Obtener todos los registros
router.get('/', async (req, res) => {
  const registros = await Registro.find()
  res.json(registros)
})

// Modificar registro
router.put('/:id', async (req, res) => {
  const registroActualizado = await Registro.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(registroActualizado)
})

// Eliminar registro
router.delete('/:id', async (req, res) => {
  await Registro.findByIdAndDelete(req.params.id)
  res.json({ message: 'Registro eliminado' })
})
export default router
