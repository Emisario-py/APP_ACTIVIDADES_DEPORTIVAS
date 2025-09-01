/* eslint-disable @stylistic/multiline-ternary */
// src/components/Auth.jsx
import { useState } from 'react'
import { login, register } from '../services/auth'
import { loginSchema } from '../schemas/userSchema.js'
import { validateForm } from '../utils/validation.js'

// Acepta la prop onLoginSuccess
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { isValid, errors: validationErrors } = await validateForm(
      loginSchema,
      form
    )

    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    try {
      if (isLogin) {
        // LOGIN
        await login(form.email, form.password)
        // Llamas a la función de la prop en lugar de redirigir con window.location.href
        onLoginSuccess()
      } else {
        // REGISTRO
        if (form.password !== form.confirmPassword) {
          setMessage('❌ Las contraseñas no coinciden')
          return
        }
        await register(form.username, form.email, form.password)
        setMessage('✅ Usuario registrado. Ahora inicia sesión')
        setIsLogin(true)
      }
    } catch (err) {
      setMessage(err.message)
    }
  }

  // ... (el resto del JSX es igual)
  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-xl shadow w-96'
      >
        <h2 className='text-xl font-bold mb-4'>
          {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
        </h2>

        {message && <p className='mb-2 text-red-500'>{message}</p>}

        {isLogin ? (
          <>
            {/* EMAIL */}
            <input
              type='email'
              name='email'
              placeholder='Correo electrónico'
              value={form.email}
              onChange={handleChange}
              className='border p-2 w-full mb-1'
              required
            />
            {errors.email && (
              <p className='text-xs text-red-500 mb-2'>{errors.email}</p>
            )}

            {/* PASSWORD */}
            <input
              type='password'
              name='password'
              placeholder='Contraseña'
              value={form.password}
              onChange={handleChange}
              className='border p-2 w-full mb-1'
              required
            />
            {errors.password && (
              <p className='text-xs text-red-500 mb-2'>{errors.password}</p>
            )}

            <button className='bg-blue-500 text-white p-2 rounded w-full'>
              Iniciar sesión
            </button>

            <p
              onClick={() => setIsLogin(false)}
              className='mt-3 text-sm text-gray-600 cursor-pointer text-center'
            >
              o, crear cuenta
            </p>
          </>
        ) : (
          <>
            {/* USERNAME */}
            <input
              type='text'
              name='username'
              placeholder='Usuario'
              value={form.username}
              onChange={handleChange}
              className='border p-2 w-full mb-1'
              required
            />
            {errors.username && (
              <p className='text-xs text-red-500 mb-2'>{errors.username}</p>
            )}

            {/* EMAIL */}
            <input
              type='email'
              name='email'
              placeholder='Correo electrónico'
              value={form.email}
              onChange={handleChange}
              className='border p-2 w-full mb-1'
              required
            />
            {errors.email && (
              <p className='text-xs text-red-500 mb-2'>{errors.email}</p>
            )}

            {/* PASSWORD */}
            <input
              type='password'
              name='password'
              placeholder='Contraseña'
              value={form.password}
              onChange={handleChange}
              className='border p-2 w-full mb-1'
              required
            />
            {errors.password && (
              <p className='text-xs text-red-500 mb-2'>{errors.password}</p>
            )}

            {/* CONFIRM PASSWORD */}
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirmar contraseña'
              value={form.confirmPassword}
              onChange={handleChange}
              className='border p-2 w-full mb-3'
              required
            />

            <button className='bg-green-500 text-white p-2 rounded w-full'>
              Crear cuenta
            </button>

            <p
              onClick={() => setIsLogin(true)}
              className='mt-3 text-sm text-gray-600 cursor-pointer text-center'
            >
              ¿Ya tienes cuenta? Inicia sesión aquí
            </p>
          </>
        )}
      </form>
    </div>
  )
}

export default Auth
