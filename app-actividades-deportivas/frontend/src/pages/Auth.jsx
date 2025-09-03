// src/components/Auth.jsx
import { useState } from 'react'
import { login, register } from '../services/auth'
import { registerSchema } from '../schemas/userSchema.js'
import { validateForm } from '../utils/validation.js'

function Auth ({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true)

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
    if (isLogin) return // en login no validamos con Yup
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

    try {
      if (isLogin) {
        // Solo login con backend
        await login(form.email, form.password)
        onLoginSuccess()
      } else {
        // Validación Yup en registro
        const { isValid, errors: validationErrors } = await validateForm(
          registerSchema,
          form
        )

        if (!isValid) {
          setErrors(validationErrors)
          return
        }

        setErrors({})
        await register(form.username, form.email, form.password)
        setMessage('✅ Usuario registrado. Ahora inicia sesión')
        setIsLogin(true)
      }
    } catch (err) {
      if (isLogin) {
        setMessage('❌ Usuario o contraseña incorrectos')
      } else {
        setMessage(`❌ ${err.message}`)
      }
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
          {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
        </h2>

        {message && (
          <p className='mb-4 text-center text-sm text-white'>{message}</p>
        )}

        {!isLogin && (
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
        )}

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

        {!isLogin && (
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
        )}

        <button className='bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold p-3 rounded-lg w-full mt-4 shadow-md'>
          {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
        </button>

        <p
          onClick={() => setIsLogin((prev) => !prev)}
          className='mt-4 text-sm text-gray-300 cursor-pointer text-center hover:text-orange-400'
        >
          {isLogin
            ? 'o, crear cuenta'
            : '¿Ya tienes cuenta? Inicia sesión aquí'}
        </p>
      </form>
    </div>
  )
}

export default Auth
