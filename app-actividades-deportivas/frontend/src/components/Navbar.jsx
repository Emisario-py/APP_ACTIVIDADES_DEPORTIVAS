import { Home, User, BarChart3 } from "lucide-react";

export default function Navbar() {
  return (
    <div className="fixed inset-y-0 left-0 h-screen w-64 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col shadow-lg">
      <div className="px-6 py-4 text-2xl font-bold text-orange-500">🏋️ App deportiva</div>
      <nav className="flex flex-col gap-2 mt-4">
        <a href="/home" className="flex items-center px-6 py-3 hover:bg-orange-100 dark:hover:bg-gray-800 rounded-lg">
          <Home className="w-5 h-5 mr-3" /> Home
        </a>
        <a href="/perfil" className="flex items-center px-6 py-3 hover:bg-orange-100 dark:hover:bg-gray-800 rounded-lg">
          <User className="w-5 h-5 mr-3" /> Perfil
        </a>
        <a href="/metricas" className="flex items-center px-6 py-3 hover:bg-orange-100 dark:hover:bg-gray-800 rounded-lg">
          <BarChart3 className="w-5 h-5 mr-3" /> Métricas
        </a>
      </nav>
    </div>
  );
}
