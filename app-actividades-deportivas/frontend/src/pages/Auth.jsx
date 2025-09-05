// src/components/Auth.jsx
import { useState } from 'react'
import { login, register } from '../services/auth'
import { useNavigate } from 'react-router-dom'
import { registerSchema } from '../schemas/userSchema.js'
import { validateForm } from '../utils/validation.js'

function Auth({ onLoginSuccess }) {
  const navigate = useNavigate()
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
    e.preventDefault()
    setMessage('')

    try {
      if (isLogin) {
        // Solo login con backend
        await login(form.email, form.password)
        onLoginSuccess()
        navigate('/home')
      } else {
        const { isValid, errors: validationErrors } = await validateForm(registerSchema, form)
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
      console.error('Auth error:', err) // Para debugging
      if (isLogin) {
        setMessage('❌ Usuario o contraseña incorrectos')
        setMessage('❌ Usuario o contraseña incorrectos')
      } else {
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
  }

  return (
    <div className='h-screen flex items-center justify-center bg-[#0F1B2D]'>
      <form
        onSubmit={handleSubmit}
        className='bg-gradient-to-r from-orange-400/30 to-orange-500/30 p-8 rounded-2xl shadow-xl w-96 text-white'
        autoComplete='off'
      >
        <h2 className='text-3xl font-semibold text-orange-500 mb-6 flex justify-center items-center'>
          {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
        </h2>

        <fieldset className='border border-gray-600 rounded-xl p-6'>
          <legend className='text-xl font-semibold text-gray-200 px-2'>
            Ingresa tus datos
          </legend>

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
                className={`w-full px-4 py-2 mb-1 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 
                          focus:outline-none focus:ring-2 focus:ring-orange-500`}
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
            className={`w-full px-4 py-2 mb-1 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 
                          focus:outline-none focus:ring-2 focus:ring-orange-500`}
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
            className={`w-full px-4 py-2 mb-1 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 
                          focus:outline-none focus:ring-2 focus:ring-orange-500`}
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
                className={`w-full px-4 py-2 mb-1 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 
                          focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
              {errors.confirmPassword && (
                <p className='text-xs text-white mb-2'>
                  {errors.confirmPassword}
                </p>
              )}
            </>
          )}
        </fieldset>

      <div className="flex justify-center mt-4">
        <button className="px-6 py-3 bg-white/30 border text-white font-bold rounded-lg hover:bg-orange-500 hover:border-orange-500 transition-colors duration-200 border-white/50">
          {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
        </button>
      </div>

      <p
        onClick={() => setIsLogin((prev) => !prev)}
        className='mt-4 text-sm text-gray-300 cursor-pointer text-center hover:text-orange-400'
      >
        {isLogin
          ? 'o, crear cuenta'
          : '¿Ya tienes cuenta? Inicia sesión aquí'}
      </p>
    </form>
    </div >
  )
}

export default Auth
