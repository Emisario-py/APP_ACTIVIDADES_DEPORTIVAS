import { Pencil } from 'lucide-react'

export default function UsuarioCard ({
  nombre,
  user,
  edad,
  peso,
  altura,
  correo,
  foto,         // URL opcional de la foto
  onEdit,
}) {
  return (
    <div className='relative w-full max-w-4xl rounded-2xl
                bg-gradient-to-r from-orange-500/50 to-yellow-600/50
                p-6 text-white shadow-lg'
    >
      {/* Editar */}
      <button
        onClick={onEdit}
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
          <div className='h-28 w-28 rounded-full overflow-hidden ring-2 ring-white/20 shadow-md bg-slate-700/60'>
            {foto
              ? (
                <img
                  src={foto}
                  alt={`Foto de ${nombre || user || 'usuario'}`}
                  className='h-full w-full object-cover'
                />
                )
              : (
                <div className='h-full w-full flex items-center justify-center text-3xl font-bold text-white/70'>
                  {(nombre?.[0] || user?.[0] || 'U').toUpperCase()}
                </div>
                )}
          </div>
        </div>

        {/* Columna derecha: datos personales */}
        <div className='md:col-span-2'>
          <h2 className='text-lg font-semibold mb-3'>Datos Personales</h2>
          <div className='space-y-1 leading-7'>
            {nombre && (
              <p>
                <span className='font-bold'>Nombre: </span>
                {nombre}
              </p>
            )}
            {correo && (
              <p>
                <span className='font-bold'>Correo: </span>
                {correo}
              </p>
            )}
            {edad && (
              <p>
                <span className='font-bold'>Edad: </span>
                {edad} años
              </p>
            )}
            {peso && (
              <p>
                <span className='font-bold'>Peso: </span>
                {peso} kg
              </p>
            )}
            {altura && (
              <p>
                <span className='font-bold'>Altura: </span>
                {altura} m
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
