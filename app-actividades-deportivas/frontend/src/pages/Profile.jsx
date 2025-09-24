import ActivityCarousel from '../Components/activities/ActivityCarousel'
import UserCard from '../Components/users/UserCard'

export default function Profile () {
  const userMock = {
    name: 'Alexa Coss',
    user: 'coss99',
    age: 25,
    userWeight: 60,
    userHeight: 1.56,
    email: 'alexacoss99@gmail.com',
  }

  const activitiesMock = [
    { id: 1, sport: 'Natación', durationMin: 30, dateISO: '2025-08-19', time: '08:00', distance: 20, repetitions: 10, note: 'Mejorar brazada' },
    { id: 2, sport: 'Correr', durationMin: 45, dateISO: '2025-08-18', time: '19:10' },
    { id: 3, sport: 'Ciclismo', durationMin: 60, dateISO: '2025-08-17', time: '07:30', calories: 520 }
  ]

  return (
    <div className='w-full h-full'>
      <h1 className='text-3xl font-bold text-orange-500 mb-6'>
        {userMock.name}
      </h1>
      {/* Datos de usuario */}
      <div className='flex justify-center'>
        <UserCard {...userMock} />
      </div>
      {/* Actividades */}
      <div className='bg-gray-700 p-6 rounded-2xl shadow mt-6'>
        <h2 className='text-xl font-semibold mb-4'>Actividades realizadas</h2>
        <ActivityCarousel actividades={activitiesMock} />
      </div>
    </div>
  )
}
