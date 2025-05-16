import { 
  ArrowLeftOnRectangleIcon,
  LinkIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  HomeIcon,
  XMarkIcon,
  Bars3Icon,
  UserIcon 
} from '@heroicons/react/20/solid'
import { useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const queryClient = useQueryClient()

  // Cerrar sidebar al cambiar el tamaño de la pantalla si es mayor a md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const tabs = [
    { name: 'Inicio', href: '/', icon: HomeIcon },
    { name: 'Mis Enlaces', href: '/admin', icon: LinkIcon },
    { name: 'Mi Perfil', href: '/admin/profile', icon: UserIcon },
    { name: 'Estadísticas', href: '/admin/analytics', icon: ChartBarIcon },
    { name: 'Configuración', href: '/admin/settings', icon: Cog6ToothIcon }
  ]

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div 
        className={`fixed inset-0   z-40 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      />
  
      {/* Botón de hamburguesa (visible siempre) */}
      <button 
        className="fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-md"
        onClick={toggleSidebar}
      >
        <Bars3Icon className="h-6 w-6 text-gray-700" />
      </button>

      {/* Sidebar */}
      <aside className={`fixed z-40 w-64 h-full bg-white shadow-md transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:transform-none transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-indigo-950">Menú</h2>
            {/* Botón de cerrar dentro del sidebar */}
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
  
          <nav className="flex-1 py-4">
            <ul className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <li key={tab.name}>
                    <Link 
                      to={tab.href} 
                      className="flex items-center p-3 rounded-lg hover:bg-slate-100 text-gray-700 hover:text-indigo-600 transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
  
          <div className="mt-auto p-4 border-t">
            <button
              className="flex items-center w-full p-3 rounded-lg hover:bg-slate-100 text-gray-700 hover:text-red-600 transition-colors"
              onClick={logout}
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}