import { useEffect, useId, useState } from 'react'
import { Pencil } from 'lucide-react'

export default function UserPicture({
  name,
  user,
  src,        // URL inicial
  onChange,   // Callback(file) para subir al backend
  size = 112, // 28 * 4 = h-28 w-28 (por defecto)
  alwaysShowOverlayOnMobile = true,
}) {
  const [preview, setPreview] = useState(src || null)
  const inputId = useId()

  // Limpia URL blob cuando cambie
  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const pickPhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Selecciona una imagen (jpg, png, etc.).')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe pesar menos de 5 MB.')
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    onChange?.(file)
  }

  return (
    <div
      className={`relative group rounded-full overflow-hidden ring-2 ring-white/20 shadow-md bg-slate-700/60`}
      style={{ width: size, height: size }}
    >
      {preview ? (
        <img
          src={preview}
          alt={`Foto de ${name || user || 'usuario'}`}
          className='h-full w-full object-cover'
          draggable={false}
        />
      ) : (
        <div className='h-full w-full flex items-center justify-center text-3xl font-bold text-white/70 select-none'>
          {(name?.[0] || user?.[0] || 'U').toUpperCase()}
        </div>
      )}

      {/* Overlay */}
      <div
        className={[
          'absolute inset-0 bg-black/40 transition flex items-center justify-center',
          alwaysShowOverlayOnMobile
            ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100'
            : 'opacity-0 group-hover:opacity-100',
        ].join(' ')}
      >
        <label
          htmlFor={inputId}
          className='cursor-pointer inline-flex items-center gap-2 rounded-full bg-gray-700/80 px-3 py-1 text-xs font-semibold text-white hover:bg-orange-500'
          title='Editar foto'
          aria-label='Cambiar foto de perfil'
        >
          <Pencil size={14} />
        </label>
        <input
          id={inputId}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={pickPhoto}
        />
      </div>
    </div>
  )
}
