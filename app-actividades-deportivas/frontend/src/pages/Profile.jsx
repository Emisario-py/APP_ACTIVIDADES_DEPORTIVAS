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
    <div className='w-full h-full flex flex-col items-center'>
      <h1 className='text-3xl font-bold text-orange-500 mb-6 w-6/8'>
        {userMock.name}
      </h1>
      {/* Datos de usuario */}
      <div className='flex justify-center'>
        <UserCard {...userMock} />
      </div>
      {/* Actividades */}
      <div className='bg-gray-700 p-6 rounded-2xl shadow mt-6 w-6/8'>
        <h2 className='text-xl font-semibold mb-4'>Actividades realizadas</h2>
        <ActivityCarousel actividades={cardsData} />
      </div>
    </div>
  )
}
