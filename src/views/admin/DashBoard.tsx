import { useEffect, useState } from "react"
import { social } from "../../data/social" // Datos iniciales de redes sociales
import SocialInput from "../../components/profile/SocialInput" 
import { isValidUrl } from "../../utils" 
import { toast } from "react-toastify" 
import { useMutation, useQueryClient } from "@tanstack/react-query" 
import { SocialNetwork, User } from "../../types" 
import { updateProfile } from "../../api/ProfileAPI" 

export default function DashBoard() {
  // Estado para manejar los enlaces sociales (inicialmente con los datos por defecto)
  const [socialLinks, setSocialLinks] = useState(social)
  // Obtiene los datos del usuario desde la cache de React Query
  const queryClient = useQueryClient()
  const user: User = queryClient.getQueryData(['user'])!

  // Configuración de la mutación para actualizar el perfil
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    },
  })

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    // Combina los datos por defecto con los enlaces que ya tiene el usuario
    const updatedData = socialLinks.map(item => {
      // Busca si el usuario ya tiene este enlace configurado
      const userlink = JSON.parse(user.links).find(
        (link: SocialNetwork) => link.name === item.name
      )
      // Si existe, usa los datos del usuario (url y estado enabled)
      if(userlink) {
        return { ...item, url: userlink.url, enabled: userlink.enabled }
      }
      // Si no existe, devuelve el item por defecto
      return item
    })
    // Actualiza el estado con la combinación de datos
    setSocialLinks(updatedData)
    
    // El array de dependencias vacío [] hace que solo se ejecute al montar el componente
  }, [])

  /**
   * Maneja el cambio en los inputs de URL
   * Evento del input que contiene name (nombre red social) y value (nueva URL)
   */
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Crea un nuevo array actualizando solo el enlace modificado
    const updatedLinks = socialLinks.map(link => 
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    )
        // Actualiza el estado con los nuevos valores
    setSocialLinks(updatedLinks)
  }

  // Obtiene los enlaces actuales del usuario parseados desde JSON
  const links: SocialNetwork[] = JSON.parse(user.links)

  /**
   * Maneja habilitar/deshabilitar un enlace social
   *  socialNetwork - Nombre de la red social a modificar
   */
  const handleEnableLink = (socialNetwork: string) => {
    // 1. Primero actualiza el estado local (UI inmediata)
    const updatedLinks = socialLinks.map(link => {
      if (link.name === socialNetwork) {
        // Solo permite habilitar si la URL es válida
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled } // Cambia el estado
        } else {
          toast.error('URL no valida') // Notifica error
          return link // Devuelve sin cambios
        }
      }
      return link // Para otros enlaces, sin cambios
    })
    
    // Actualiza el estado local
    setSocialLinks(updatedLinks)

    // 2. Prepara la estructura de datos para guardar
    let updatedItems: SocialNetwork[] = []
    
    // Encuentra el enlace que se está modificando
    const selectedSocialNetwork = updatedLinks.find(
      link => link.name === socialNetwork
    )

    // CASO 1: Cuando se HABILITA un enlace
    if(selectedSocialNetwork?.enabled) {
      // Asigna un nuevo ID (cantidad de enlaces habilitados + 1)
      const id = links.filter(link => link.id).length + 1
      
      // Subcaso 1.1: El enlace ya existía en el usuario
      if(links.some(link => link.name === socialNetwork)) {
        updatedItems = links.map(link => {
          if(link.name === socialNetwork) {
            // Actualiza este enlace con nuevo estado y ID
            return { ...link, enabled: true, id }
          } else {
            return link // Otros enlaces sin cambios
          }
        })
      } 
      // Subcaso 1.2: El enlace es nuevo para el usuario
      else {
        // Crea un nuevo objeto con el ID asignado
        const newItem = { ...selectedSocialNetwork, id }
        // Añade al array existente
        updatedItems = [...links, newItem]
      }
    } 
    // CASO 2: Cuando se DESHABILITA un enlace
    else {
      // Encuentra la posición del enlace a deshabilitar
      const indexToUpdate = links.findIndex(
        link => link.name === socialNetwork
      )
      
      updatedItems = links.map(link => {
        // 2.1: Para el enlace deshabilitado
        if(link.name === socialNetwork) {
          return {
             ...link, 
             id: 0, 
             enabled: false }
        } 
        // 2.2: Para enlaces con ID mayor al deshabilitado
        else if(link.id > indexToUpdate && (indexToUpdate !== 0 && link.id===1)) {
          // Reduce su ID para mantener secuencia
          return { 
            ...link,
             id: link.id - 1 }
        }
        // 2.3: Para otros enlaces
        else {
          return link
        }
      })
    }
    
    // 3. Actualiza la cache de React Query (optimistic update)
    queryClient.setQueryData(['user'], (prevData: User) => {
      return { 
        ...prevData, // Mantiene todos los demás datos del usuario
        links: JSON.stringify(updatedItems) // Actualiza solo los enlaces
      }
    })
  }


  return (
    <>
      <div className="space-y-5">
        {/* Mapea cada red social para crear sus inputs */}
        {socialLinks.map(item => (
          <SocialInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
          />
        ))}
 
        <button 
          className="bg-black hover:bg-white hover:text-black hover:border-black border border-black p-2 text-white uppercase font-black text-xs rounded-lg cursor-pointer w-full"
          onClick={() => mutate(queryClient.getQueryData(['user'])!)} // Ejecuta la mutación con los datos del usuario
        >
          Guardar Cambios
        </button>
      </div>
    </>
  )
}