import { Activity , Home, User, BarChart3 } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='fixed inset-y-0 left-0 h-screen w-64 
                    bg-[#0b1320] 
                    text-gray-200 
                    flex flex-col shadow-lg'>
      {/* Logo */}
      <div className='flex items-center gap-2 px-6 py-4 text-2xl font-bold text-orange-500'>
        <Activity  className="w-7 h-7" />
        <span>App deportiva</span>
      </div>

      {/* Navbar */}
      <nav className='flex flex-col gap-1 mt-4'>
        <NavLink
          to='/home'
          className={({ isActive }) =>
            `flex items-center px-6 py-3 rounded-lg transition ${isActive
              ? 'bg-gray-800 text-orange-500 font-semibold'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <Home className='w-5 h-5 mr-3' /> Home
        </NavLink>

        <NavLink
          to='/profile'
          className={({ isActive }) =>
            `flex items-center px-6 py-3 rounded-lg transition ${isActive
              ? 'bg-gray-800 text-orange-500 font-semibold'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <User className='w-5 h-5 mr-3' /> Perfil
        </NavLink>

        <NavLink
          to='/metrics'
          className={({ isActive }) =>
            `flex items-center px-6 py-3 rounded-lg transition ${isActive
              ? 'bg-gray-800 text-orange-500 font-semibold'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <BarChart3 className='w-5 h-5 mr-3' /> Métricas
        </NavLink>
      </nav>
    </div>
  )
}
