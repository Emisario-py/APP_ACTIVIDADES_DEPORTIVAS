import * as yup from 'yup'

export const UsuarioFormSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre es obligatorio'),
  cumpleaños: yup
    .date()
    .typeError('Selecciona tu fecha de nacimiento')
    .required(),
  peso: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value
    )
    .min(20, 'Valor fuera de rango')
    .max(500, 'Valor fuera de rango')
    .typeError('El peso debe ser un número')
    .required('Ingresa tu peso'),
  altura: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value
    )
    .min(0.50, 'Valor fuera de rango')
    .max(2.50, 'Valor fuera de rango')
    .typeError('La altura debe ser un número')
    .required('Ingresa tu altura'),
  deportefav: yup
    .string()
    .required('Selecciona tu deporte o actividad favorita'),
})

// Agregar Género
