// Define la URL base de tu API. Esto permite cambiarla fácilmente en un solo lugar.
const API_URL = "http://localhost:4000/api";

/**
 * Función para registrar un nuevo usuario.
 * @param {object} data - Un objeto que contiene los datos del usuario (ej. {username, email, password}).
 * @returns {Promise<object>} - Retorna una promesa que se resuelve con la respuesta del servidor (generalmente el usuario registrado).
 * @throws {Error} - Lanza un error si la solicitud no fue exitosa.
 */
export const register = async (data) => {
  // Realiza una solicitud POST a la ruta '/register' de la API.
  const res = await fetch(`${API_URL}/register`, {
    method: "POST", // Especifica el método de la solicitud como POST.
    headers: { "Content-Type": "application/json" }, // Indica que el cuerpo de la solicitud es JSON.
    credentials: "include", // Permite el envío y recepción de cookies con la solicitud.
    body: JSON.stringify(data), // Convierte el objeto de datos a una cadena JSON para el cuerpo de la solicitud.
  });

  // Si la respuesta no es 'ok' (es decir, el estado HTTP es 4xx o 5xx), lanza un error.
  if (!res.ok) throw new Error("Error al registrar");
  
  // Parsea la respuesta como JSON y la retorna.
  return res.json();
};

/**
 * Función para iniciar sesión con un usuario existente.
 * @param {string} email - El email del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<object>} - Retorna una promesa que se resuelve con la respuesta del servidor (ej. un token o datos del usuario).
 * @throws {Error} - Lanza un error si las credenciales son inválidas.
 */
export const login = async (email, password) => {
  // Realiza una solicitud POST a la ruta '/login' de la API.
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Habilita la gestión de cookies para el almacenamiento de la sesión en el navegador.
    body: JSON.stringify({ email, password }), // Envía el email y la contraseña como JSON.
  });

  // Si la respuesta no es 'ok', lanza un error de "Credenciales inválidas".
  if (!res.ok) throw new Error("Credenciales inválidas");
  
  // Parsea la respuesta como JSON y la retorna.
  return res.json();
};

/**
 * Función para cerrar la sesión del usuario.
 * Esta función no necesita manejar datos de respuesta, solo envía la solicitud.
 */
export const logout = async () => {
  // Realiza una solicitud POST a la ruta '/logout' de la API.
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include", // Esencial para enviar la cookie de sesión al servidor y que la invalide.
  });
};