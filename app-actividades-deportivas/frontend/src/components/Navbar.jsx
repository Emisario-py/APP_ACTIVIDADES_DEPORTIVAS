// src/components/Navbar.jsx
import { Activity, Home, User, BarChart3, LogOut, Dumbbell } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Navbar () {
  return (
    <>
      <div className='fixed inset-y-0 left-0 h-screen w-64
                    bg-[#0b1320]
                    text-gray-200
                    flex flex-col shadow-lg'
      >
        {/* Logo */}
        <div className='flex items-center gap-2 px-6 py-4 text-2xl font-bold text-orange-500'>
          <Activity className='w-7 h-7' />
          <span>App deportiva</span>
        </div>
        <nav className='flex flex-col gap-1 mt-4'>
          <Link
            to='/home'
            className={({ isActive }) =>
              `flex items-center px-6 py-3 rounded-lg transition ${isActive
                ? 'bg-gray-800 text-orange-500 font-semibold'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <div className='flex justify-center my-4'>
              <Home className='w-5 h-5 mr-3' /> Home
            </div>
          </Link>
          <Link
            to='/deportes'
            className={({ isActive }) =>
              `flex items-center px-6 py-3 rounded-lg transition ${isActive
                ? 'bg-gray-800 text-orange-500 font-semibold'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <div className='flex justify-center my-4'>
              <Dumbbell className='w-5 h-5 mr-3' /> Deportes
            </div>
          </Link>
          <Link
            to='/profile'
            className={({ isActive }) =>
              `flex items-center px-6 py-3 rounded-lg transition ${isActive
                ? 'bg-gray-800 text-orange-500 font-semibold'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <div className='flex justify-center my-4'>
              <User className='w-5 h-5 mr-3' /> Perfil
            </div>
          </Link>
          <Link
            to='/metrics'
            className={({ isActive }) =>
              `flex items-center px-6 py-3 rounded-lg transition ${isActive
                ? 'bg-gray-800 text-orange-500 font-semibold'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <div className='flex justify-center my-4'>
              <BarChart3 className='w-5 h-5 mr-3' /> Metricas
            </div>
          </Link>
          {/* El enlace ahora apunta a la ruta de logout */}
          <Link
            to='/logout'
            className={({ isActive }) =>
              `flex items-center px-6 py-3 rounded-lg transition ${isActive
                ? 'bg-gray-800 text-orange-500 font-semibold'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <div className='flex justify-center my-4'>
              <LogOut className='w-5 h-5 mr-3' /> Cerrar Sesión
            </div>
          </Link>
        </nav>
      </div>
    </>
  )
}
