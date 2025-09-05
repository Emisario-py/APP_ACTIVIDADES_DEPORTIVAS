// src/pages/Auth.jsx
import { useState } from 'react'
import { login } from '../services/auth'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema } from '../schemas/userSchema.js'
import { validateForm } from '../utils/validation.js'
import { useAuth } from '../context/AuthContext.jsx'

function Auth () {
  const { setUser, user } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  // Si el usuario ya está logueado, redirigir a home
  if (user) {
    navigate('/home', { replace: true })
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = async (e) => {
    const { name } = e.target
    try {
      await loginSchema.validateAt(name, form)
      setErrors((prev) => ({ ...prev, [name]: null }))
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setIsLoading(true)

    const { isValid, errors: validationErrors } = await validateForm(loginSchema, form)
    if (!isValid) {
      setErrors(validationErrors)
      setIsLoading(false)
      return
    }
    setErrors({})

    try {
      // Hacer login
      const res = await login(form.email, form.password)
      console.log('Login response:', res)

      // Actualizar el contexto con los datos del usuario
      setUser(res.data || res.user || res)

      // Redirigir a home
      navigate('/home', { replace: true })
    } catch (err) {
      console.error('Auth error:', err)
      setMessage('❌ Usuario o contraseña incorrectos')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='h-screen flex items-center justify-center bg-[#0f1b2d]'>
      <form
        onSubmit={handleSubmit}
        className='bg-gradient-to-r from-[#8b4513] to-[#a0522d] p-8 rounded-2xl shadow-xl w-96 text-white'
        autoComplete='off'
      >
        <h2 className='text-2xl font-bold mb-6 text-center'>
          Iniciar sesión
        </h2>

        {message && (
          <p className='mb-4 text-center text-sm text-white'>{message}</p>
        )}

        {/* EMAIL */}
        <input
          type='email'
          name='email'
          placeholder='Correo electrónico'
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          className='bg-[#1c2a3d] border border-gray-600 p-3 w-full rounded-lg mb-1 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50'
        />
        {errors.email && (
          <p className='text-xs text-white mb-2'>{errors.email}</p>
        )}

        {/* PASSWORD */}
        <input
          type='password'
          name='password'
          placeholder='Contraseña'
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          className='bg-[#1c2a3d] border border-gray-600 p-3 w-full rounded-lg mb-1 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50'
        />
        {errors.password && (
          <p className='text-xs text-white mb-2'>{errors.password}</p>
        )}

        <button
          type='submit'
          disabled={isLoading}
          className='bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold p-3 rounded-lg w-full mt-4 shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>

        <Link to='/register'>
          <p className='mt-4 text-sm text-gray-300 cursor-pointer text-center hover:text-orange-400'>
            o, crear cuenta
          </p>
        </Link>
      </form>
    </div>
  )
}

export default Auth
