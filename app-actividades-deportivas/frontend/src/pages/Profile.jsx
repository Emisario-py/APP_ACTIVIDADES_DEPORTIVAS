import { useEffect, useState } from 'react'
import ActivityCarousel from '../components/activities/ActivityCarousel'
import UserCard from '../components/users/UserCard'
import { getMyRegisterRequest } from '../api/auth'

export default function Profile () {
  const [cardsData, setCardsData] = useState([])

  useEffect(() => {
    getData()
    console.log('prueba')
  }, [])

  const getData = async () => {
    try {
      const res = await getMyRegisterRequest()
      console.log(res.data)
      setCardsData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const userMock = {
    name: 'Imanol Fuentes',
    user: 'ImaFuentes10',
    age: 28,
    userWeight: 78,
    userHeight: 1.75,
    email: 'ima10@mail.com',
  }

  /*   const activitiesMock = [
    { id: 1, sport: 'Natación', durationMin: 30, dateISO: '2025-08-19', time: '08:00', distance: 20, repetitions: 10, note: 'Mejorar brazada' },
    { id: 2, sport: 'Correr', durationMin: 45, dateISO: '2025-08-18', time: '19:10' },
    { id: 3, sport: 'Ciclismo', durationMin: 60, dateISO: '2025-08-17', time: '07:30', calories: 520 }
  ]
 */
  return (
    <div className='w-full h-full px-6 py-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-50 mb-2'>
          {userMock.name}
        </h1>
        <p className='text-slate-400'>Gestiona tu perfil y consulta tus actividades</p>
      </div>

      {/* Datos de usuario */}
      <div className='flex justify-center mb-8'>
        <UserCard {...userMock} />
      </div>

      {/* Actividades */}
      <div className='bg-orange-500/20 p-4 rounded-2xl shadow mt-6 h-1/2 mb-2'>
        <div className='bg-gray-900 p-6 rounded-xl shadow-sm'>
          <h2 className='text-xl font-semibold text-slate-50 mb-4'>Actividades realizadas</h2>
          <ActivityCarousel actividades={cardsData} />
        </div>
      </div>
    </div>
  )
}
