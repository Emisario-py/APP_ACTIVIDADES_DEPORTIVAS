import React from 'react'
// import './Home.css' // Asegúrate de crear este archivo para los estilos

export const Home = () => {
  // Datos de ejemplo para el usuario y su progreso
  const user = {
    name: 'Usuario',
    weeklyGoal: 5,
    completedWorkouts: 3
  }

  // Datos de ejemplo para planes de entrenamiento recomendados
  const recommendedPlans = [
    {
      id: 1,
      title: 'Rutina de fuerza',
      description: 'Una rutina para aumentar masa muscular.',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb58e99478f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      title: 'Entrenamiento de cardio',
      description: 'Mejora tu resistencia y quema calorías.',
      imageUrl: 'https://images.unsplash.com/photo-1549488344-93e117a26f30?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ]

  // Datos de ejemplo para actividades recientes
  const recentActivities = [
    { id: 1, name: 'Carrera - 5 km', date: 'Hoy', duration: '30 minutos' },
    { id: 2, name: 'Gimnasio - Tren superior', date: 'Ayer', duration: '45 minutos' }
  ]

  return (
    <div className='home-container'>
      <div className='welcome-section'>
        <h2>¡Hola, {user.name}!</h2>
        <div className='progress-summary'>
          <p>Llevas **{user.completedWorkouts}** de **{user.weeklyGoal}** entrenamientos esta semana.</p>
        </div>
      </div>

      <div className='content-section'>
        <h2 className='section-title'>Planes de entrenamiento recomendados</h2>
        <div className='cards-container'>
          {recommendedPlans.map(plan => (
            <div key={plan.id} className='card'>
              <img src={plan.imageUrl} alt={plan.title} />
              <div className='card-info'>
                <h3>{plan.title}</h3>
                <p>{plan.description}</p>
                <button>Comenzar</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='content-section'>
        <h2 className='section-title'>Últimas actividades</h2>
        <div className='activity-list'>
          {recentActivities.map(activity => (
            <div key={activity.id} className='activity-item'>
              <p>{activity.name}</p>
              <span>{activity.date} - {activity.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
