export default function Perfil() {
  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Perfil de Usuario</h1>

      {/* Datos de usuario */}
      <div className="bg-gray-700 p-6 rounded-2xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Datos Personales</h2>
        <p><span className="font-bold">Nombre:</span> Juan Pérez</p>
        <p><span className="font-bold">Correo:</span> juanperez@mail.com</p>
        <p><span className="font-bold">Edad:</span> 28 años</p>
      </div>

      {/* Actividades */}
      <div className="bg-gray-700 p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Natación</h2>
        <ul className="list-disc list-inside space-y-2">
          <p>30 min - 19/08/2025</p>
        </ul>
      </div>
    </div>
  );
}
