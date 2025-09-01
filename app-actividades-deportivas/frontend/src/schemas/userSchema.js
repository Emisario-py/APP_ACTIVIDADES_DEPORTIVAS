import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("El nombre de usuario es requerido").trim(),
  email: yup
    .string()
    .required("El email es requerido")
    .email("Ingresa un email válido"),

  password: yup.string().required("La contraseña es requerida"),
});
