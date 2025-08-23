import { useRef, useState, useEffect } from 'react'
import ActivityCard from './ActivityCard'

export default function ActivityCarousel ({ actividades = [] }) {
  const trackRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

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
    (a, b) => new Date(b.fechaISO) - new Date(a.fechaISO)
  )

  return (
    <div className='relative'>
      {/* Button left */}
      <button
        onClick={() => scrollByCards(-1)}
        disabled={!canPrev}
        className={`hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full 
          items-center justify-center border 
          ${canPrev
            ? 'bg-gray-700/80 hover:bg-orange-500 text-white border-white/10 cursor-pointer'
            : 'bg-gray-800/40 text-gray-500 border-gray-700 cursor-not-allowed'
          }`}
        aria-label='Anterior'
      >
        ‹
      </button>

      {/* Button right */}
      <button
        onClick={() => scrollByCards(1)}
        disabled={!canNext}
        className={`hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full 
          items-center justify-center border 
          ${canNext
            ? 'bg-gray-700/80 hover:bg-orange-500 text-white border-white/10 cursor-pointer'
            : 'bg-gray-800/40 text-gray-500 border-gray-700 cursor-not-allowed'
          }`}
        aria-label='Siguiente'
      >
        ›
      </button>

      {/* Contenedor */}
      <div
        ref={trackRef}
        className='flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 py-2
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
      >
        {items.map((a) => (
          <ActivityCard key={a.id} {...a} />
        ))}
      </div>
      <div className='mt-2 text-xs text-center opacity-60'>Desliza para ver más</div>
    </div>
  )
}
