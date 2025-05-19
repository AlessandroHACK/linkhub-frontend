import { 
  LinkIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  HomeIcon,
  XMarkIcon,
  Bars3Icon,
  UserIcon 
} from '@heroicons/react/20/solid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoLogOut } from "react-icons/io5";
import { logout } from '../api/AuthAPI'
import { toast } from 'react-toastify';
import { User } from '../types';

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const queryClient = useQueryClient()
  const location = useLocation()
  const navigate = useNavigate()
  const data: User = queryClient.getQueryData(['user'])!

  const logoutMutation = useMutation({
    mutationFn: logout, 
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.removeQueries()
      toast.success(data)
      navigate('/auth/login')
    }
  })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
      {/* Mobile backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
        aria-hidden="true"
      />

      {/* Hamburger button (mobile only) - Se oculta cuando el sidebar está abierto */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg hover:bg-gray-100 transition-colors"
          onClick={toggleSidebar}
          aria-label="Abrir menú"
        >
          <Bars3Icon className="h-6 w-6 text-indigo-600" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 w-72 h-screen flex flex-col bg-white shadow-xl transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-all duration-300 ease-in-out`}
      >
        {/* Nombre de la app */}
        <div className="px-6 pt-6">
          <h1 className="text-2xl font-bold text-indigo-600 mb-6">LinkHUb</h1>
        </div>

        {/* Sección de usuario */}
        <div className="flex items-center px-6 pb-6 border-b border-indigo-100">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden mr-3">
            {data.image ? (
              <img
                src={data.image}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            ) : (
              <UserIcon className="w-6 h-6 text-indigo-600" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{data.name || data.handle}</h2>
          </div>
          
          <button
            className="md:hidden ml-auto p-1 rounded-full hover:bg-indigo-100 text-indigo-500 transition-colors"
            onClick={toggleSidebar}
            aria-label="Cerrar menú"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.href;
              return (
                <li key={tab.name}>
                  <Link
                    to={tab.href}
                    className={`flex items-center p-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-indigo-50 font-semibold text-indigo-700"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon
                      className={`h-5 w-5 mr-3 ${
                        isActive ? "text-indigo-600" : "text-gray-500"
                      }`}
                    />
                    <span>{tab.name}</span>
                    {isActive && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-indigo-600" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout button */}
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-indigo-100">
          <button
            className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
              logoutMutation.isPending
                ? "bg-gray-100 text-gray-500"
                : "hover:bg-red-50 text-red-600 hover:text-red-700"
            }`}
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            <div className="flex items-center">
              <IoLogOut className="h-5 w-5 mr-3" />
              <span className="font-medium">
                {logoutMutation.isPending ? "Saliendo..." : "Cerrar Sesión"}
              </span>
            </div>
            {logoutMutation.isPending && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
            )}
          </button>
        </div>
      </aside>
    </>
  )
}