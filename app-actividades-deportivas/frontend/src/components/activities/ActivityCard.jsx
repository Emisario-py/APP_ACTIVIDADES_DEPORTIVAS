import { Pencil, Trash2, Flame, Ruler, Layers, Repeat, Heart, Trophy, Clock } from 'lucide-react'

// Funciones dinámicas para unidades
const getDistanceUnit = (deporte) => {
  if (deporte === 'Natación') return 'm'
  if (deporte === 'Atletismo') return 'km'
  return 'm'
}

const getScoreUnit = (deporte) => {
  if (deporte === 'Basquetbol') return 'canastas'
  if (deporte === 'Futbol') return 'goles'
  return 'pts'
}

const OPTIONAL_METRICS = (deporte) => ({
  calories: { label: 'Calorías', icon: <Flame size={14} className="text-orange-400" />, unit: 'kcal' },
  distance: { label: 'Distancia', icon: <Ruler size={14} className="text-green-600" />, unit: getDistanceUnit(deporte) },
  series: { label: 'Series', icon: <Layers size={14} className="text-purple-400" />, unit: 'series' },
  repetitions: { label: 'Repeticiones', icon: <Repeat size={14} className="text-blue-400" />, unit: 'reps' },
  rhythm: { label: 'Ritmo', icon: <Heart size={14} className="text-red-400" />, unit: 'bpm' },
  score: { label: 'Puntuación', icon: <Trophy size={14} className="text-yellow-400" />, unit: getScoreUnit(deporte) }
})

export default function ActivityCard({
  id,
  sport,
  durationMin,
  dateISO,
  time,
  note,
  onEdit,
  onDelete,
  ...optionals
}) {
  const date = new Date(dateISO).toLocaleDateString()

  const metrics = OPTIONAL_METRICS(sport)

  const chips = Object.entries(metrics)
    .map(([key, def]) => {
      const value = optionals[key]
      if (value == null || value === '') return null
      return { key, icon: def.icon, label: def.label, text: `${value}${def.unit ? ` ${def.unit}` : ''}` }
    })
    .filter(Boolean)

  return (
    <div className='relative shrink-0 snap-center w-[min(28rem,85vw)] rounded-2xl bg-orange-500/20 p-5 text-gray-100'>
      {/* Buttons */}
      <div className='absolute right-3 top-3 z-10 flex gap-2'>
        {/* Editar */}
        <button
          onClick={() => onEdit?.({ /* Pasar todos los datos */
            id,
            sport,
            duration: durationMin,
            date: dateISO,
            startTime: time,
            note,
            ...optionals, /* Datos opcionales */
          })}
          className='h-9 w-9 flex items-center justify-center rounded-full border
                     hover:bg-orange-500 text-white border-white/10 transition'
          aria-label='Editar'
          title='Editar'
        >
          <Pencil size={16} />
        </button>
        {/* Eliminar */}
        <button
          onClick={() => onDelete?.(id)}
          className='h-9 w-9 flex items-center justify-center rounded-full border
                     hover:bg-red-600 text-white border-white/10 transition'
          aria-label='Eliminar'
          title='Eliminar'
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Actividad deportiva */}
      <div className='text-lg font-semibold text-orange-500'>{sport}</div>

      {/* Datos base */}
      <div className='mt-1 text-sm opacity-80'>
        {date} {time ? `• ${time}` : ''}
      </div>
      <div className='mt-1 text-sm opacity-80 flex items-center gap-1'>
        <Clock size={14} className="text-gray-300" />
        <span>{durationMin} min</span>
      </div>

      {/* Chips opcionales */}
      {chips.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c.key}
              className="inline-flex items-center gap-2 rounded-full bg-gray-800/60 px-3 py-1 text-xs
                   backdrop-blur-sm shadow-sm"
              title={c.label}
            >
              {c.icon}
              <span className="font-semibold">{c.text}</span>
            </span>
          ))}
        </div>
      )}

      {note && <p className='mt-3 text-sm leading-6 opacity-90'>Nota: {note}.</p>}
    </div>
  )
}
