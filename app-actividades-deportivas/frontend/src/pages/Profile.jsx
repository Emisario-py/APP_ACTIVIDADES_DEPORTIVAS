import ActivityCarousel from '../components/activities/ActivityCarousel'
import UserCard from '../components/users/UserCard'

export default function Profile() {
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
          <ActivityCarousel actividades={activitiesMock} />
        </div>
      </div>
    </div>
  )
}
