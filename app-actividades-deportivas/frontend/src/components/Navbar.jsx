import { Home, User, BarChart3, LogIn, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Auth from '../pages/Auth'

export default function Navbar () {
  const { logout } = useAuth() // obtenemos usuario y logout del contexto

  return (
    <>
      <>
        <div className='fixed inset-y-0 left-0 h-screen w-64 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col shadow-lg'>
          <div className='px-6 py-4 text-2xl font-bold text-orange-500'>🏋️ App deportiva</div>
          <nav className='flex flex-col gap-2 mt-4'>
            {/* Usar Link en lugar de <a> */}
            <Link to='/home' className='flex items-center px-6 py-3 hover:bg-orange-100 dark:hover:bg-gray-800 rounded-lg'>
              <Home className='w-5 h-5 mr-3' /> Home
            </Link>
            <Link to='/profile' className='flex items-center px-6 py-3 hover:bg-orange-100 dark:hover:bg-gray-800 rounded-lg'>
              <User className='w-5 h-5 mr-3' /> Perfil
            </Link>
            <Link to='/metrics' className='flex items-center px-6 py-3 hover:bg-orange-100 dark:hover:bg-gray-800 rounded-lg'>
              <BarChart3 className='w-5 h-5 mr-3' /> Metricas
            </Link>
            <Link to='/logout' onClick={logout} className='flex items-center px-6 py-3 hover:bg-orange-100 dark:hover:bg-gray-800 rounded-lg'>
              <LogOut className='w-5 h-5 mr-3' /> Cerrar Sesión
            </Link>
          </nav>
        </div>
      </>
      )
    </>
  )
}
