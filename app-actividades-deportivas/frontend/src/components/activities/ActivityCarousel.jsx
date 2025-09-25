import { useRef, useState, useEffect } from 'react'
import ActivityCard from './ActivityCard'
import { FormularioGeneral } from '../FormularioGeneral'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

export default function ActivityCarousel ({ actividades }) {
  const trackRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [editingActivity, setEditingActivity] = useState(null)

  // scroll
  const checkScroll = () => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 0)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 5)
  }

  const scrollByCards = (dir = 1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('div.snap-center')
    const step = card ? card.getBoundingClientRect().width + 16 : 320
    el.scrollBy({ left: dir * step * 2, behavior: 'smooth' }) // Dos tarjetas
  }

  useEffect(() => {
    checkScroll()
    const el = trackRef.current
    if (el) {
      el.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [actividades])

  const items = [...actividades].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  return (
    <div className='relative'>
      {/* Botón izquierdo */}
      <button
        onClick={() => scrollByCards(-1)}
        disabled={!canPrev}
        className={`hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full 
          items-center justify-center border transition-all duration-300 backdrop-blur-sm
          ${canPrev
            ? 'bg-gray-800/90 hover:bg-orange-500 text-slate-300 hover:text-white border-gray-600 hover:border-orange-500 cursor-pointer shadow-lg hover:shadow-xl hover:scale-105'
            : 'bg-gray-800/40 text-slate-600 border-gray-700 cursor-not-allowed'
          }`}
        aria-label='Anterior'
      >
        <ArrowLeft className='w-5 h-5' />
      </button>

      {/* Botón derecho */}
      <button
        onClick={() => scrollByCards(1)}
        disabled={!canNext}
        className={`hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full 
          items-center justify-center border transition-all duration-300 backdrop-blur-sm
          ${canNext
            ? 'bg-gray-800/90 hover:bg-orange-500 text-slate-300 hover:text-white border-gray-600 hover:border-orange-500 cursor-pointer shadow-lg hover:shadow-xl hover:scale-105'
            : 'bg-gray-800/40 text-slate-600 border-gray-700 cursor-not-allowed'
          }`}
        aria-label='Siguiente'
      >
        <ArrowRight className='w-5 h-5' />
      </button>

      {/* Contenedor del carrusel */}
      <div
        ref={trackRef}
        className='flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 py-2
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
      >
        {items.map((a) => (
          <ActivityCard
            key={a.id}
            {...a}
            onEdit={(actividad) => setEditingActivity(actividad)}
          />
        ))}
      </div>

      {/* Indicador de deslizar */}
      <div className='mt-4 text-center'>
        <p className='text-sm text-slate-400'>
          <span className='inline-flex items-center gap-1'>
            <span>Desliza para ver más</span>
            <span className='text-orange-400'>→</span>
          </span>
        </p>
      </div>

      {/* Modal para editar actividad */}
      {editingActivity && (
        <div className='fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4'>
          <div className='bg-gray-800 border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden'>
            {/* Header del modal */}
            <div className='flex items-center justify-between p-6 border-b border-gray-700/50'>
              <h3 className='text-lg font-semibold text-white'>Editar Actividad</h3>
              <button
                onClick={() => setEditingActivity(null)}
                className='h-9 w-9 flex items-center justify-center rounded-full border
                     hover:bg-red-600 text-white border-white/10 transition'
                aria-label='Cerrar'
                title='Cerrar'
              >
                <X className='w-4 h-4 group-hover:scale-110 transition-transform' />
              </button>
            </div>

            {/* Contenido del modal */}
            <div className='p-6 overflow-y-auto max-h-[calc(90vh-80px)]'>
              <FormularioGeneral
                initialActivity={editingActivity}
                onClose={() => setEditingActivity(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}