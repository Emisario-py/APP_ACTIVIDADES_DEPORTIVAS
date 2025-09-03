import * as yup from 'yup'

export const getMaxBirthday = () => {
  const today = new Date()
  const year = today.getFullYear() - 12
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const UserFormSchema = yup.object({
  name: yup
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .required('El nombre es obligatorio'),
  birthday: yup
    .date()
    .typeError('Selecciona tu fecha de nacimiento')
    .max(getMaxBirthday(), 'Debes ser mayor de 12 años para usar este servicio')
    .required(),
  userWeight: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value
    )
    .min(20, 'Valor fuera de rango')
    .max(500, 'Valor fuera de rango')
    .typeError('El peso debe ser un número')
    .required('Ingresa tu peso'),
  userHeight: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value
    )
    .min(0.50, 'Valor fuera de rango')
    .max(2.50, 'Valor fuera de rango')
    .typeError('La altura debe ser un número')
    .required('Ingresa tu altura'),
  favSport: yup
    .string()
    .required('Selecciona tu deporte o actividad favorita'),
})

// Agregar Género
