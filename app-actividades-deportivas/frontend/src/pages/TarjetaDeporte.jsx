import userImg from '../assets/P1.jpg'
import userImg1 from '../assets/p2.jpg'
import userImg2 from '../assets/p3.jpg'
import userImg3 from '../assets/p4.jpg'
import userImg4 from '../assets/p5.jpg'
import userImg5 from '../assets/p6.jpg'
import userImg6 from '../assets/p7.jpg'
import userImg7 from '../assets/p8.jpg'
import { Link } from 'react-router-dom'

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
      name: 'Gymnasio',
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
      name: 'voleybol',
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
      <h2>Selecciona tu deporte</h2>
      <div className='contenedor-deportes'>
        {deportes.map((deporte) => {
          return (
            <Link
              to={`/FormularioGeneral/${deporte.name}`}
              key={deporte.id}
            >
              <section>
                <h2>{deporte.name}</h2>
                <img src={deporte.img} alt={deporte.name} />
                <br />

                <button
                  className='w-full mt-4 bg-orange-500 text-white font-bold py-2 rounded-lg
                           hover:bg-orange-600 transition-colors duration-200
                           shadow-md hover:shadow-lg'
                >
                  Seleccionar
                </button>
              </section>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
