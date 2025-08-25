import { useState } from "react";
import { login, register } from "../services/auth";

// Componente principal de autenticación (login y registro)
function Auth() {
  // Estado para controlar si el usuario está en la vista de login o registro
  const [isLogin, setIsLogin] = useState(true);

  // Estado que almacena los datos del formulario (username, email, password)
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Estado para mostrar mensajes de error o éxito al usuario
  const [message, setMessage] = useState("");

  // Función para manejar los cambios en los inputs del formulario
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Función principal para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    try {
      // Si estamos en la vista de login
      if (isLogin) {
        // Llama a la función de login con el email y password del formulario
        await login(form.email, form.password);
        // Redirige al usuario al dashboard después de un login exitoso
        window.location.href = "/dashboard";
      } else {
        // Si estamos en la vista de registro, primero verifica si las contraseñas coinciden
        if (form.password !== form.confirmPassword) {
          setMessage("❌ Las contraseñas no coinciden");
          return; // Detiene la ejecución si las contraseñas no son iguales
        }
        // Llama a la función de registro con los datos del formulario
        const res = await register({
          username: form.username,
          email: form.email,
          password: form.password,
        });
        // Muestra un mensaje de éxito y cambia a la vista de login
        setMessage("✅ Usuario registrado. Ahora inicia sesión");
        setIsLogin(true);
      }
    } catch (err) {
      // Captura y muestra cualquier mensaje de error de la API
      setMessage(err.message);
    }
  };

  return (
    // Contenedor principal para centrar el formulario
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-96"
      >
        {/* Título dinámico que cambia entre "Log in" y "Sign up" */}
        <h2 className="text-xl font-bold mb-4">
          {isLogin ? "Log in" : "Sign up"}
        </h2>
        {/* Muestra un mensaje de error o éxito si existe */}
        {message && <p className="mb-2 text-red-500">{message}</p>}

        {/* Renderizado condicional basado en el estado `isLogin` */}
        {isLogin ? (
          <>
            {/* Campos del formulario de LOGIN */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />
            {/* Botón para iniciar sesión */}
            <button className="bg-blue-500 text-white p-2 rounded w-full">
              Log in
            </button>
            {/* Enlace para cambiar a la vista de registro */}
            <p
              onClick={() => setIsLogin(false)}
              className="mt-3 text-sm text-gray-600 cursor-pointer text-center "
            >
              or, sign up
            </p>
          </>
        ) : (
          <>
            {/* Campos del formulario de REGISTRO */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />
            {/* Botón para crear una cuenta */}
            <button className="bg-green-500 text-white p-2 rounded w-full">
              Create Account
            </button>
            {/* Enlace para cambiar a la vista de login */}
            <p
              onClick={() => setIsLogin(true)}
              className="mt-3 text-sm text-gray-600 cursor-pointer cursor-pointer text-center"
            >
              Already have an account? Login here
            </p>
          </>
        )}
      </form>
    </div>
  );
}

export default Auth;