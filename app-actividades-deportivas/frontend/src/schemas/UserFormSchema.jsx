import * as yup from 'yup'

export const UserFormSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es obligatorio'),
  birthday: yup
    .date()
    .typeError('Selecciona tu fecha de nacimiento')
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
