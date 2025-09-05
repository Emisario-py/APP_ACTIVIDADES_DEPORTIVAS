import { Pencil } from 'lucide-react'
import UserPicture from './UserPicture'
import { Link } from 'react-router-dom'

export default function UserCard({
  name,
  user,
  age,
  userWeight,
  userHeight,
  email,
  profilePicture, // URL opcional de la foto
  onPhotoChange,
}) {
  return (
    <div className='relative w-full rounded-2xl
                bg-gradient-to-r from-orange-500/40 to-yellow-600/40
                p-6 text-white shadow-lg'
    >
      {/* Editar */}

      <Link to='/profile/form/user'>
        <button
          className='hidden md:flex absolute right-3 top-3 z-10 h-10 w-10 rounded-full items-center justify-center border hover:bg-orange-500 text-white border-white/10 transition transition duration-200 ease-in-out'
          aria-label='Editar'
          title='Editar'
        >
          <Pencil size={18} />
        </button>
      </Link>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>
        {/* Columna izquierda: usuario + foto */}
        <div className='md:col-span-1 flex flex-col items-center gap-3'>
          {user && (
            <h3 className='text-xl font-semibold tracking-wide text-white'>@{user}</h3>
          )}

          {/* Foto / avatar */}
          <UserPicture
            name={name}
            user={user}
            src={profilePicture}     // URL inicial
            onChange={onPhotoChange} // Pasar el File para subirlo
            size={112}               // Equivale a h-28 w-28
            alwaysShowOverlayOnMobile // Overlay visible en móvil
          />
        </div>

        {/* Columna derecha: datos personales */}
        <div className='md:col-span-2'>
          <h2 className='text-lg font-semibold mb-3'>Datos Personales</h2>

          {/* Name */}
          {email && <p className='mb-2 text-orange-500'>{name}</p>}

          {/* Email */}
          {email && <p className='mb-2'>{email}</p>}

          {/* Fila: edad · peso · altura */}
          <div className='flex flex-wrap items-center gap-x-4 text-sm text-gray-200'>
            {age && <span>{age} años</span>}
            {userWeight && <span className='mx-2'>·</span>}
            {userWeight && <span>{userWeight} kg</span>}
            {userHeight && <span className='mx-2'>·</span>}
            {userHeight && <span>{userHeight} m</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
