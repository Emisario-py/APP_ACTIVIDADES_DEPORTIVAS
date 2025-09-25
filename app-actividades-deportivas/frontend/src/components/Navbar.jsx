// src/components/Navbar.jsx
import { Activity, Home, User, BarChart3, LogOut, Dumbbell } from 'lucide-react'
import { NavLink } from 'react-router-dom'
export default function Navbar() {
  return (
    <>
      <div className='fixed inset-y-0 left-0 h-screen w-64
                    bg-[#000d2a]
                    text-gray-200
                    flex flex-col shadow-lg'
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 py-6 text-2xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="1" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="1" />
              </linearGradient>
            </defs>
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>

          <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
            App deportiva
          </span>
        </div>

        <nav className='flex flex-col gap-1 mt-4'>
          <NavLink
            to='/home'
            className={({ isActive }) =>
              `flex items-center px-6 py-3 rounded-lg transition ${isActive
                ? 'bg-gray-800 text-orange-500 font-semibold'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <Home className='w-5 h-5 mr-3' /> Home
          </NavLink>
          <NavLink
            to='/deportes'
            className={({ isActive }) =>
              `flex items-center px-6 py-3 rounded-lg transition ${isActive
                ? 'bg-gray-800 text-orange-500 font-semibold'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <Dumbbell className='w-5 h-5 mr-3' /> Deportes
          </NavLink>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              `flex items-center px-6 py-3 rounded-lg transition ${isActive
                ? 'bg-gray-800 text-orange-500 font-semibold'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <User className='w-5 h-5 mr-3' /> Perfil
          </NavLink>
          <NavLink
            to='/metrics'
            className={({ isActive }) =>
              `flex items-center px-6 py-3 rounded-lg transition ${isActive
                ? 'bg-gray-800 text-orange-500 font-semibold'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <BarChart3 className='w-5 h-5 mr-3' /> Metricas
          </NavLink>
          {/* El enlace ahora apunta a la ruta de logout */}
          <NavLink
            to='/logout'
            className={({ isActive }) =>
              `flex items-center px-6 py-3 rounded-lg transition ${isActive
                ? 'bg-gray-800 text-orange-500 font-semibold'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <LogOut className='w-5 h-5 mr-3' /> Cerrar Sesión
          </NavLink>
        </nav>
      </div>
    </>
  )
}
