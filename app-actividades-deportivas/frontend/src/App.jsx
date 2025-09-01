import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import { TarjetaDeporte } from './components/TarjetaDeporte'
import { FormularioGeneral } from './components/FormularioGeneral'

const Dashboard = () => {
  return (
    <div className='w-full h-full'>
      <h1 className='text-3xl font-bold text-orange-500 mb-6'>
        Bienvenido a la App Deportiva
      </h1>
      <p className='text-gray-300'>
        Explora las secciones en la barra lateral para ver tu perfil, métricas y registrar actividades.
      </p>
    </div>
  )
}

export const App = () => {
  return (
    <BrowserRouter>
      {/* El Navbar se renderiza en todas las páginas */}
      <Navbar />

      {/* El main container envuelve el contenido de las rutas */}
      <main className='ml-64 min-h-screen bg-gray-800 text-gray-100 p-6'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/perfil' element={<Profile />} />
          <Route path='/deportes' element={<TarjetaDeporte />} />
          <Route path='/FormularioGeneral/:deporte' element={<FormularioGeneral />} />
          <Route path='/metricas' element={<h1>Métricas</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
