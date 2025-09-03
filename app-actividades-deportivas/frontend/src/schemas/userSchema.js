// src/schemas/userSchema.js
import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('El nombre de usuario es requerido')
    .trim()
    .min(5, 'Debe tener al menos 5 caracteres')
    .max(20, 'No puede tener más de 20 caracteres')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'El nombre de usuario solo puede contener letras, números y guiones bajos'
    ),

  email: yup
    .string()
    .required('El email es requerido')
    .email('Ingresa un email válido')
    .trim()
    .lowercase(),

  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(12, 'La contraseña debe tener al menos 12 caracteres')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .matches(
      /[!@#$%^&*]/,
      'Debe contener al menos un carácter especial (!@#$%^&*)'
    ),

  confirmPassword: yup
    .string()
    .required('Debes confirmar la contraseña')
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
})
