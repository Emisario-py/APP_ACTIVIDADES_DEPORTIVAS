import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { config } from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import registersRouter from './routes/registers.routes.js'
import cookieParser from 'cookie-parser'

config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors({
  origin: 'https://app-actividades-deportivas-vp5p.vercel.app/',
  credentials: true
}))
app.use(cookieParser())

app.use('/api/registers', registersRouter)
app.use('/api', authRoutes)

mongoose.connect(process.env.MONGO_KEY).then(() => console.log('Conectado a MongoDB'))

app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto', PORT)
})
