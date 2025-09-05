import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getMaxBirthday, UserFormSchema } from '../schemas/userFormSchema.js'
import { Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import { userInfoRequest } from '../api/auth.js'

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(UserFormSchema)
  })

  const onSubmit = async (data) => {
    if (isValid) {
      console.log(data)
      const id = ''
      const res = await userInfoRequest(id)
      console.log(res)
    }
  }

  return (
    <div className='flex justify-center w-full min-h-full py-12'>
      <div className='bg-orange-500/20 p-8 rounded-2xl shadow-2xl w-full max-w-lg'>
        <h2 className='text-3xl font-semibold text-orange-500 mb-6 flex justify-center items-center'>
          Editar Perfil <Pencil size={18} className="ml-4" />
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className='border border-gray-600 rounded-xl p-6'>
            <legend className='text-xl font-semibold text-gray-200 px-2'>
              Ingresa tus datos personales
            </legend>

            {/* Nombre */}
            <div className='mt-4'>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                Nombre
              </label>
              <input
                name='name'
                type='text'
                placeholder='Ingresa tu nombre'
                className={`w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 
                         focus:outline-none focus:ring-2 focus:ring-orange-500
                ${errors.name
                    ? 'border-2 border-red-500 focus:border-red-400 focus:ring-red-200'
                    : ''
                  }`}
                {...register('name')}
              />
              {errors.name && <p className='text-red-400'>{errors.name.message}</p>}
            </div>

            {/* Fecha */}
            <div className='mt-4'>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                Fecha de nacimiento
              </label>
              <input
                name='birthday'
                type='date'
                max={getMaxBirthday()}
                className={`w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 
                         focus:outline-none focus:ring-2 focus:ring-orange-500`}
                {...register('birthday')}
              />
            </div>

            {/* Peso y Altura */}
            <div className="mt-4 flex gap-4">
              <div className="w-1/2">
                <label className='block text-sm font-medium text-gray-400 mb-1'>
                  Peso
                </label>
                <input
                  name='userWeight'
                  type='number'
                  placeholder='Kg'
                  className={`w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 
                           focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  {...register('userWeight')}
                />
              </div>
              <div className="w-1/2">
                <label className='block text-sm font-medium text-gray-400 mb-1'>
                  Altura
                </label>
                <input
                  name='userHeight'
                  type='number'
                  placeholder='m'
                  className={`w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 
                           focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  {...register('userHeight')}
                />
              </div>
            </div>

            {/* Deporte favorito */}
            <div className='mt-4'>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                Deporte Favorito
              </label>
              <select
                name='favSport'
                className={`w-full px-4 py-2 rounded-lg bg-gray-900/70 text-gray-100 border border-gray-600 
                         focus:outline-none focus:ring-2 focus:ring-orange-500`}
                {...register('favSport')}
              >
                <option value=''>Selecciona un deporte</option>
                <option value='Atletismo'>Atletismo</option>
                <option value='Basquetbol'>Basquetbol</option>
                <option value='Futbol'>Futbol</option>
                <option value='Gimnasio'>Gimnasio</option>
                <option value='Natación'>Natación</option>
              </select>
            </div>
          </fieldset>

          {/* Botones */}
          <div className='flex justify-around mt-8'>
            <button
              type='submit'
              className='px-6 py-3 bg-white/30 border text-white font-bold rounded-lg hover:bg-orange-500 hover:border-orange-500 transition-colors duration-200 border-white/50'
            >
              Guardar
            </button>
            <Link to='/profile'>
              <button
                type="button"
                className="px-6 py-3 bg-red-500/30 border text-white font-bold rounded-lg hover:bg-red-500 transition-colors duration-200 border-red-500/40"
              >
                Cancelar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

