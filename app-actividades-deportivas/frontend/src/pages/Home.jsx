import '../index.css'

export const Home = () => {
  return (
    <div className="w-full h-full px-6 py-8 max-w-6xl mx-auto">

      {/* Bienvenida */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-50 mb-2'>
          ¡Hola, Usuario!
        </h1>
        <p className="text-slate-400">
          Llevas{" "}
          <span className="font-semibold text-orange-400">{user.completedWorkouts}</span>{" "}
          de{" "}
          <span className="font-semibold text-orange-400">{user.weeklyGoal}</span>{" "}
          entrenamientos esta semana.
        </p>
      </div>

      {/* Planes recomendados */}
      <div className="bg-gradient-to-r from-orange-500/60 via-amber-500/60 to-orange-500/60 p-4 rounded-2xl shadow mb-6">
        <div className="bg-gray-900 rounded-2xl shadow p-6 flex flex-col overflow-hidden">
          {/* Título*/}
          <div className="text-center px-4 pb-4 border-b border-orange-500/20 mb-4">
            <h2 className="text-2xl font-extrabold text-orange-400 flex justify-center items-center gap-2">
              Planes de entrenamiento recomendados
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {recommendedPlans.map(plan => (
              <div
                key={plan.id}
                className="rounded-xl p-4 bg-gradient-to-r from-orange-400/30 to-orange-500/30"
              >
                <img
                  src={plan.imageUrl}
                  alt={plan.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-orange-400">{plan.title}</h3>
                <p className="text-slate-200 mb-3">{plan.description}</p>
                <button className="flex items-center justify-center gap-2 px-6 py-2 
    bg-white/30 border border-white/50 text-white font-bold rounded-lg 
    hover:bg-orange-500 hover:border-orange-500 transition-colors duration-200 
    mx-auto block"
                >
                  Comenzar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actividades recientes */}
      <div className="bg-gradient-to-r from-orange-500/60 via-amber-500/60 to-orange-500/60 p-4 rounded-2xl shadow">
        <div className="bg-gray-900 rounded-2xl shadow p-6 flex flex-col overflow-hidden">
          {/* Título */}
          <div className="text-center px-4 pb-4 border-b border-orange-500/20 mb-4">
            <h2 className="text-2xl font-extrabold text-orange-400 flex justify-center items-center gap-2">
              Últimas actividades
            </h2>
          </div>
          <div className="space-y-3">
            {recentActivities.map(activity => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-orange-400/30 to-orange-500/30"
              >
                <p className="text-slate-200">{activity.name}</p>
                <span className="text-sm text-slate-300">
                  {activity.date} - {activity.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )

}
