import { Pencil } from 'lucide-react'
import { useState } from 'react'
import UserForm from './UserForm'
import UserPicture from './UserPicture'

export default function UserCard ({
  name,
  user,
  age,
  userWeight,
  userHeight,
  email,
  profilePicture, // URL opcional de la foto
  onPhotoChange,
}) {
  const [openForm, setOpenForm] = useState(false)

  if (openForm) { // Si openForm = true, mostrar form
    return (
      <div className='relative w-full max-w-4xl rounded-2xl p-6 bg-gray-800 text-white shadow-lg'>
        <button
          onClick={() => setOpenForm(false)}
          className='absolute right-3 top-3 z-10 h-10 w-10 rounded-full flex items-center justify-center border bg-gray-700 hover:bg-orange-500 text-white border-white/10 transition'
          aria-label='Cerrar'
          title='Cerrar'
        >
          X
        </button>
        <UserForm />
      </div>
    )
  }

  // Si openForm = false, mostrar user card
  return (
    <div className='relative w-full max-w-4xl rounded-2xl
                bg-gradient-to-r from-orange-500/50 to-yellow-600/50
                p-6 text-white shadow-lg'
    >
      {/* Editar */}
      <button
        onClick={() => setOpenForm(true)}
        className='hidden md:flex absolute right-3 top-3 z-10 h-10 w-10 rounded-full items-center justify-center border bg-gray-700/80 hover:bg-orange-500 text-white border-white/10 transition'
        aria-label='Editar'
        title='Editar'
      >
        <Pencil size={18} />
      </button>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>
        {/* Columna izquierda: usuario + foto */}
        <div className='md:col-span-1 flex flex-col items-center gap-3'>
          {user && (
            <h3 className='text-xl font-semibold tracking-wide'>@{user}</h3>
          )}

          {/* Foto / avatar */}
          <UserPicture
            name={name}
            user={user}
            src={profilePicture}     // URL inicial
            onChange={onPhotoChange} // Pasar el File para subirlo
            size={112}               // Equivale a h-28 w-28
            alwaysShowOverlayOnMobile={true} // Overlay visible en móvil
          />
        </div>

        {/* Columna derecha: datos personales */}
        <div className='md:col-span-2'>
          <h2 className='text-lg font-semibold mb-3'>Datos Personales</h2>
          <div className='space-y-1 leading-7'>
            {name && (
              <p>
                <span className='font-bold'>Nombre: </span>
                {name}
              </p>
            )}
            {email && (
              <p>
                <span className='font-bold'>Correo: </span>
                {email}
              </p>
            )}
            {age && (
              <p>
                <span className='font-bold'>Edad: </span>
                {age} años
              </p>
            )}
            {userWeight && (
              <p>
                <span className='font-bold'>Peso: </span>
                {userWeight} kg
              </p>
            )}
            {userHeight && (
              <p>
                <span className='font-bold'>Altura: </span>
                {userHeight} m
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
