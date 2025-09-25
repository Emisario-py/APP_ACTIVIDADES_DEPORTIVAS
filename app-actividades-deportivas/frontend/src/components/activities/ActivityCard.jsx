import { Pencil, Trash2 } from 'lucide-react'

const OPTIONAL_METRICS = {
  calories: { label: 'Calorías', icon: '🔥', unit: 'kcal' },
  distance: { label: 'Metros', icon: '📏', unit: 'm' },
  repetitions: { label: 'Repeticiones', icon: '🔁' },
  weight: { label: 'Peso', icon: '🏋️', unit: 'kg' },
  rhythm: { label: 'Ritmo', icon: '🫀' },
}

export default function ActivityCard ({
  id,
  sport,
  startTime,
  date,
  duration,
  note,
  onEdit,
  onDelete,
  ...optionals
}) {
  /* const date = new Date(dateISO).toLocaleDateString() */

  const chips = Object.entries(OPTIONAL_METRICS)
    .map(([key, def]) => {
      const value = optionals[key]
      if (value == null || value === '') return null
      return { key, icon: def.icon, label: def.label, text: `${value}${def.unit ? ` ${def.unit}` : ''}` }
    })
    .filter(Boolean)

  return (
    <div className='relative shrink-0 snap-center w-[min(28rem,85vw)] rounded-2xl bg-orange-500/50 border border-white/10 p-5 text-gray-100'>
      {/* Buttons */}
      <div className='absolute right-3 top-3 z-10 flex gap-2'>
        {/* Editar */}
        <button
          onClick={() => onEdit?.({ /* Pasar todos los datos */
            id,
            sport,
            duration,
            date,
            startTime,
            note,
            ...optionals, /* Datos opcionales */
          })}
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
      <div className='text-lg font-semibold text-blue-300'>{sport}</div>

      {/* Datos base */}
      <div className='mt-1 text-sm opacity-80'>
        {duration} min • {date} {startTime ? `• ${startTime}` : ''}
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

      {note && <p className='mt-3 text-sm leading-6 opacity-90'>Nota: {note}.</p>}
    </div>
  )
}
