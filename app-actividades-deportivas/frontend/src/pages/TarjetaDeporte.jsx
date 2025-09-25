import userImg from '../assets/p1.jpg'
import userImg1 from '../assets/p2.jpg'
import userImg2 from '../assets/p3.jpg'
import userImg3 from '../assets/p4.jpg'
import userImg4 from '../assets/p5.jpg'
import userImg5 from '../assets/p6.jpg'
import userImg6 from '../assets/p7.jpg'
import userImg7 from '../assets/p8.jpg'
import { Link } from 'react-router-dom'
import { MousePointerClick } from 'lucide-react'

export const TarjetaDeporte = () => {
  const deportes = [
    {
      id: 1,
      name: 'Basquetbol',
      img: userImg
    },
    {
      id: 2,
      name: 'Futbol',
      img: userImg1
    },
    {
      id: 3,
      name: 'Gimnasio',
      img: userImg2
    },
    {
      id: 4,
      name: 'Atletismo',
      img: userImg3
    },
    {
      id: 5,
      name: 'Natación',
      img: userImg4
    },
    {
      id: 6,
      name: 'Voleibol',
      img: userImg5
    },
    {
      id: 7,
      name: 'Esgrima',
      img: userImg6
    },
    {
      id: 8,
      name: 'Cazador',
      img: userImg7
    }
  ]
  return (
    <div className='Card'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-50 mb-2'>
          ¿Qué hiciste hoy?
        </h1>
        <p className='text-slate-400'>Registra tus actividades eligiendo un deporte</p>
      </div>

      <div className='bg-gradient-to-r from-orange-500/60 via-amber-500/60 to-orange-500/60 p-4 rounded-2xl shadow mt-6 h-1/2 mb-2'>
        <div className='bg-gray-900 p-6 rounded-xl shadow-sm'>
          <div className='contenedor-deportes grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {deportes.map((deporte) => (
              <Link
                to={`/FormularioGeneral/${deporte.name}`}
                key={deporte.id}
              >
                <section
                  className='rounded-2xl shadow-lg p-4 flex flex-col items-center
                        hover:scale-105 transition-transform'
                >
                  {/* Nombre */}
                  <h2 className='text-lg mb-3'>
                    {deporte.name}
                  </h2>

                  {/* Imagen */}
                  <img
                    src={deporte.img}
                    alt={deporte.name}
                    className='rounded-lg object-cover h-40 w-full shadow-md'
                  />

                  {/* Botón */}
                  <div className='flex justify-center w-full mt-4'>

                    <button
                      className='flex items-center justify-center gap-2 px-6 py-2
                  bg-white/30 border border-white/50 text-white font-bold rounded-lg
                  hover:bg-orange-500 hover:border-orange-500 transition-colors duration-200'
                    >
                      Seleccionar
                      <MousePointerClick className='w-5 h-5' />
                    </button>

                  </div>

                </section>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
