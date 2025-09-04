import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerSchema } from '../schemas/userSchema'
import { registerRequest } from '../api/auth'
import { register } from '../services/auth'
import { validateForm } from '../utils/validation'

export const Register = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = async (e) => {
    const { name } = e.target

    try {
      await registerSchema.validateAt(name, form)
      setErrors((prev) => ({ ...prev, [name]: null }))
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    e.preventDefault()
    setMessage('')

    try {
      const { isValid, errors: validationErrors } = await validateForm(registerSchema, form)
      if (!isValid) {
        setErrors(validationErrors)
        return
      }
      setErrors({})
      await register(form.username, form.email, form.password)
      setMessage('✅ Usuario registrado. Ahora inicia sesión')
      navigate('/login')
    } catch (err) {
      console.error('Auth error:', err) // Para debugging
      // Muestra errores específicos de duplicados
      if (err.message.includes('username') || err.message.includes('usuario')) {
        setMessage('❌ El nombre de usuario ya está en uso')
      } else if (err.message.includes('email') || err.message.includes('correo')) {
        setMessage('❌ El correo electrónico ya está registrado')
      } else {
        setMessage(`❌ ${err.message}`)
      }
    }
  }

  return (
    <div className='ml-64 min-h-screen bg-gray-800 text-gray-100 p-6'>
      <div className='h-screen flex items-center justify-center bg-[#0f1b2d]'>
        <form
          onSubmit={handleSubmit}
          className='bg-gradient-to-r from-[#8b4513] to-[#a0522d] p-8 rounded-2xl shadow-xl w-96 text-white'
          autoComplete='off'
        >
          <h2 className='text-2xl font-bold mb-6 text-center'>
            Crear cuenta
          </h2>

          {message && (
            <p className='mb-4 text-center text-sm text-white'>{message}</p>
          )}

          <>
            {/* USERNAME */}
            <input
              type='text'
              name='username'
              placeholder='Usuario'
              value={form.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className='bg-[#1c2a3d] border border-gray-600 p-3 w-full rounded-lg mb-1 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
            {errors.username && (
              <p className='text-xs text-white mb-2'>{errors.username}</p>
            )}
          </>

          {/* EMAIL */}
          <input
            type='email'
            name='email'
            placeholder='Correo electrónico'
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className='bg-[#1c2a3d] border border-gray-600 p-3 w-full rounded-lg mb-1 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500'
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
            className='bg-[#1c2a3d] border border-gray-600 p-3 w-full rounded-lg mb-1 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500'
          />
          {errors.password && (
            <p className='text-xs text-white mb-2'>{errors.password}</p>
          )}

          <>
            {/* CONFIRM PASSWORD */}
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirmar contraseña'
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className='bg-[#1c2a3d] border border-gray-600 p-3 w-full rounded-lg mb-1 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
            {errors.confirmPassword && (
              <p className='text-xs text-white mb-2'>
                {errors.confirmPassword}
              </p>
            )}
          </>

          <button className='bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold p-3 rounded-lg w-full mt-4 shadow-md'>
            'Crear cuenta'
          </button>

          <Link to='/login'>
            <p className='mt-4 text-sm text-gray-300 cursor-pointer text-center hover:text-orange-400'>
              ¿Ya tienes cuenta? Inicia sesión aquí
            </p>
          </Link>
        </form>
      </div>
    </div>
  )
}
