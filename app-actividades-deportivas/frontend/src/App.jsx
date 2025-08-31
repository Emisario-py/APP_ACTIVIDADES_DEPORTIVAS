import Navbar from './components/Navbar'
import './App.css'
import Profile from './components/Profile'
import { Home } from './Home'

export const App = () => {
  return (
    <>
      <Navbar />
      <Home/>
      <main className='ml-64 min-h-screen bg-gray-800 text-gray-100 p-6'>
        <Profile />
      </main>
    </>
  )
}

