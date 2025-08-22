import { Pencil, Trash2 } from 'lucide-react'

const METRICAS_OPCIONALES = {
  calorias: { label: 'Calorías', icon: '🔥', unit: 'kcal' },
  metros: { label: 'Metros', icon: '📏', unit: 'm' },
  repeticiones: { label: 'Repeticiones', icon: '🔁' },
  peso: { label: 'Peso', icon: '🏋️', unit: 'kg' },
  ritmo: { label: 'Ritmo', icon: '🫀' },
}

export default function ActividadCard ({
  id,
  deporte,
  duracionMin,
  fechaISO,
  hora,
  nota,
  onEdit,
  onDelete,
  ...opcionales
}) {
  const fecha = new Date(fechaISO).toLocaleDateString()

  const chips = Object.entries(METRICAS_OPCIONALES)
    .map(([key, def]) => {
      const valor = opcionales[key]
      if (valor == null || valor === '') return null
      return { key, icon: def.icon, label: def.label, text: `${valor}${def.unit ? ` ${def.unit}` : ''}` }
    })
    .filter(Boolean)

  return (
    <div className='relative shrink-0 snap-center w-[min(28rem,85vw)] rounded-2xl bg-orange-500/50 border border-white/10 p-5 text-gray-100'>
      {/* Buttons */}
      <div className='absolute right-3 top-3 z-10 flex gap-2'>
        {/* Editar */}
        <button
          onClick={() => onEdit?.(id)}
          className='h-9 w-9 flex items-center justify-center rounded-full border
                     bg-gray-700/80 hover:bg-orange-500 text-white border-white/10 transition'
          aria-label='Editar'
          title='Editar'
        >
          <Pencil size={16} />
        </button>
        {/* Eliminar */}
        <button
          onClick={() => onDelete?.(id)}
          className='h-9 w-9 flex items-center justify-center rounded-full border
                     bg-gray-700/80 hover:bg-red-600 text-white border-white/10 transition'
          aria-label='Eliminar'
          title='Eliminar'
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Actividad deportiva */}
      <div className='text-lg font-semibold text-blue-300'>{deporte}</div>

      {/* Datos base */}
      <div className='mt-1 text-sm opacity-80'>
        {duracionMin} min • {fecha} {hora ? `• ${hora}` : ''}
      </div>

      {/* Chips opcionales */}
      {chips.length > 0 && (
        <div className='mt-3 flex flex-wrap gap-2'>
          {chips.map((c) => (
            <span
              key={c.key}
              className='inline-flex items-center gap-1 rounded-full bg-gray-800/60 px-3 py-1 text-xs
                         border border-white/10 backdrop-blur-sm shadow-sm'
              title={c.label}
            >
              <span>{c.icon}</span>
              <span className='opacity-80'>{c.label}:</span>
              <span className='font-semibold'>{c.text}</span>
            </span>
          ))}
        </div>
      )}

      {nota && <p className='mt-3 text-sm leading-6 opacity-90'>Nota: {nota}.</p>}
    </div>
  )
}
