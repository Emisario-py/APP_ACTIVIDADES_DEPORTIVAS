import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UsuarioFormSchema } from '../../schemas/UsuarioFormSchema'
import { Pencil } from 'lucide-react'

export default function UsuarioForm () {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(UsuarioFormSchema)
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
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
          className='bg-gray-900 p-2 px-4 rounded-2xl shadow mt-1'
          name='nombre'
          {...register('nombre')}
          type='text'
          placeholder='Ingresa tu nombre'
        />
        {errors.nombre &&
          <p className=' text-red-400'>{errors.nombre.message}</p>}

        <label
          className='text-xl font-semibold mr-1 mt-4 mb-1'
          htmlFor='cumpleaños'
        >
          Fecha de nacimiento:
        </label>
        <input
          className='bg-gray-900 p-2 px-4  rounded-2xl shadow mt-1'
          name='cumpleaños'
          {...register('cumpleaños')}
          type='date'
        />
        {errors.cumpleaños &&
          <p className='text-red-400'>{errors.cumpleaños.message}</p>}

        <div className='flex justify-around items-center mt-4'>
          <label
            className='text-xl font-semibold mr-2 mb-1 w-1/10'
            htmlFor='peso'
          >
            Peso:
          </label>
          <input
            className='bg-gray-900 py-2 px-4 rounded-2xl shadow mt-1 w-8/10 font-normal text-base'
            name='peso'
            {...register('peso')}
            type='number'
            placeholder='Ingresa tu peso'
          />
          <span className='w-1/10 font-semibold text-xl ml-1'>m</span>
        </div>
        {errors.peso &&
          <p className='text-red-400'>{errors.peso.message}</p>}

        <div className='flex justify-around items-center mt-4'>
          <label
            className='text-xl font-semibold mr-2 mb-1 w-1/10'
            htmlFor='altura'
          >
            Altura:
          </label>
          <input
            className='bg-gray-900 p-2 px-4  rounded-2xl shadow mt-1 w-8/10 font-normal text-base'
            name='altura'
            {...register('altura')}
            type='number'
            placeholder='Ingresa tu altura'
          />
          <span className='w-1/10 font-semibold text-xl ml-1'>m</span>
        </div>
        {errors.altura &&
          <p className='text-red-400'>{errors.altura.message}</p>}

        <label
          className='text-xl font-semibold mr-1 mt-4 mb-1'
          htmlFor='deportefav'
        >
          Deporte Favorito:
        </label>
        <select
          className='bg-gray-900 py-2 px-6 rounded-2xl shadow mt-1'
          name='deportefav'
          id='deportefav'
          {...register('deportefav')}
          defaultValue=''
        > {/* hay que editar la dropdownarrow */}
          <option value=''> Selecciona un deporte </option>
          <option value='correr'> Correr </option>
          <option value='natación'> Natación </option>
          <option value='ciclismo'> Ciclismo </option>
        </select>
        {errors.deportefav &&
          <p className='text-red-400'>{errors.deportefav.message}</p>}

        <div className='flex justify-around mt-8'>
          <button
            type='submit'
            /* disabled={!isValid}
            className={`p-4 rounded transition font-bold
          ${isValid
            ? 'bg-gray-800 hover:bg-orange-500 text-white border-white/10 cursor-pointer'
            : 'bg-gray-800/40 text-gray-500 border-gray-700 cursor-not-allowed'
          }`} */
            className='p-4 rounded transition font-bold bg-gray-800 hover:bg-orange-500 text-white border-white/10 cursor-pointer'
          >
            Guardar
          </button>
          <button
            className='p-4 rounded transition cursor-pointer bg-gray-500 hover:bg-red-400 text-white font-bold'
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
