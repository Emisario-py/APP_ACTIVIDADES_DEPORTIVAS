import ActividadCarousel from './actividades/ActividadCarousel'
import UsuarioCard from './usuarios/UsuarioCard'

export default function Perfil () {
  const usuarioMock = {
    nombre: 'Alexa Coss',
    user: 'coss99',
    edad: 25,
    peso: 60,
    altura: 1.56,
    correo: 'alexacoss99@gmail.com',
  }

  const actividadesMock = [
    { id: 1, deporte: 'Natación', duracionMin: 30, fechaISO: '2025-08-19', hora: '08:00', metros: 20, repeticiones: 10, nota: 'Mejorar brazada' },
    { id: 2, deporte: 'Correr', duracionMin: 45, fechaISO: '2025-08-18', hora: '19:10' },
    { id: 3, deporte: 'Ciclismo', duracionMin: 60, fechaISO: '2025-08-17', hora: '07:30', calorias: 520 }
  ]

  return (
    <div className='w-full h-full'>
      <h1 className='text-3xl font-bold text-orange-500 mb-6'>
        {usuarioMock.nombre}
      </h1>

      {/* Datos de usuario */}
      <div className='flex justify-center'>
        <UsuarioCard {...usuarioMock} />
      </div>

      {/* Actividades */}
      <div className='bg-gray-700 p-6 rounded-2xl shadow mt-6'>
        <h2 className='text-xl font-semibold mb-4'>Actividades realizadas</h2>
        <ActividadCarousel actividades={actividadesMock} />
      </div>
    </div>
  )
}
