import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getMaxBirthday, UserFormSchema } from '../schemas/UserFormSchema.js'
import { Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UserForm () {
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
    }
  }

  return (

    <div className='relative w-full max-w-4xl rounded-2xl p-6 bg-gray-800 text-white shadow-lg'>

      <div
        className='bg-gray-700 p-6 rounded-2xl shadow mt-6'
      >
        <h2 className='text-xl font-semibold mb-4 flex justify-center items-center'>
          <span>Editar Perfil</span>
          <Pencil
            size={18}
            className='ml-4'
          />
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col justify-center'
        >
          <label
            className='text-xl font-semibold mr-1 mb-1'
            htmlFor='nombre'
          >
            Nombre:
          </label>
          <input
            name='name'
            type='text'
            placeholder='Ingresa tu nombre'
            className={
            `bg-gray-900 p-2 px-4 rounded-2xl shadow mt-1 transition-colors duration-200 
            ${errors.name
              ? 'border-2 border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-200'
              : 'border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`
          }
            {...register('name')}
          />
          {errors.name &&
            <p className=' text-red-400'>{errors.name.message}</p>}

          <label
            className='text-xl font-semibold mr-1 mt-4 mb-1'
            htmlFor='birthday'
          >
            Fecha de nacimiento:
          </label>
          <input
            name='birthday'
            type='date'
            max={getMaxBirthday()}
            className={
            `bg-gray-900 p-2 px-4 rounded-2xl shadow mt-1 transition-colors duration-200 
            ${errors.birthday
              ? 'border-2 border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-200'
              : 'border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`
          }
            {...register('birthday')}
          />
          {errors.birthday &&
            <p className='text-red-400'>{errors.birthday.message}</p>}

          <div className='flex justify-around items-center mt-4'>
            <label
              className='text-xl font-semibold mr-2 mb-1 w-1/10'
              htmlFor='user-weight'
            >
              Peso:
            </label>
            <input
              name='user-weight'
              type='number'
              placeholder='Ingresa tu peso'
              className={
            `bg-gray-900 p-2 px-4 rounded-2xl shadow mt-1 transition-colors duration-200 
              ${errors.userWeight
                ? 'border-2 border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-200'
                : 'border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              }`
            }
              {...register('userWeight')}
            />
            <span className='w-1/10 font-semibold text-xl ml-1'>kg</span>
          </div>
          {errors.userWeight &&
            <p className='text-red-400'>{errors.userWeight.message}</p>}

          <div className='flex justify-around items-center mt-4'>
            <label
              className='text-xl font-semibold mr-2 mb-1 w-1/10'
              htmlFor='user-height'
            >
              Altura:
            </label>
            <input
              name='user-height'
              type='number'
              placeholder='Ingresa tu altura'
              className={
            `bg-gray-900 p-2 px-4 rounded-2xl shadow mt-1 transition-colors duration-200 
            ${errors.userHeight
              ? 'border-2 border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-200'
              : 'border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`
          }
              {...register('userHeight')}
            />
            <span className='w-1/10 font-semibold text-xl ml-1'>m</span>
          </div>
          {errors.userHeight &&
            <p className='text-red-400'>{errors.userHeight.message}</p>}

          <label
            className='text-xl font-semibold mr-1 mt-4 mb-1'
            htmlFor='favorite-sport'
          >
            Deporte Favorito:
          </label>
          <select
            className={
            `bg-gray-900 p-2 px-4 rounded-2xl shadow mt-1 transition-colors duration-200 
            ${errors.favSport
              ? 'border-2 border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-200'
              : 'border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`
          }
            name='favorite-sport'
            {...register('favSport')}
            defaultValue=''
          >
            <option value=''> Selecciona un deporte </option>
            <option value='Atletismo'> Atletismo </option>
            <option value='Basquetbol'> Basquetbol </option>
            <option value='Futbol'> Futbol </option>
            <option value='Gimnasio'> Gimnasio </option>
            <option value='Natación'> Natación </option>
          </select>
          {errors.favSport &&
            <p className='text-red-400'>{errors.favSport.message}</p>}

          <div className='flex justify-around mt-8'>
            <button
              type='submit'
              className='p-4 rounded transition font-bold bg-gray-800 hover:bg-orange-500 text-white border-white/10 cursor-pointer'
            >
              Guardar
            </button>

            <Link to='/profile'>
              <button
                className='p-4 rounded transition cursor-pointer bg-gray-500 hover:bg-red-500 text-white font-bold'
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
