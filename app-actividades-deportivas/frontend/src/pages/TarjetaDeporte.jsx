import userImg from '../assets/p1.jpg'
import userImg1 from '../assets/p2.jpg'
import userImg2 from '../assets/p3.jpg'
import userImg3 from '../assets/p4.jpg'
import userImg4 from '../assets/p5.jpg'
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
    }
  ]
  return (
    <div className='Card'>
      <h2>Selecciona tu deporte</h2>
      <div className='contenedor-deportes'>
        {deportes.map((deporte) => {
          return (
            <section key={deporte.id}>
              <h2>{deporte.name}</h2>
              <img src={deporte.img} alt={deporte.name} />
              <br />
              <Link to={`/form/${deporte.name}`}>
                <button
                  className='w-full mt-4 bg-orange-500 text-white font-bold py-2 rounded-lg
                           hover:bg-orange-600 transition-colors duration-200
                           shadow-md hover:shadow-lg'
                >
                  Seleccionar
                </button>
              </Link>
            </section>
          )
        })}
      </div>
    </div>
  )
}
