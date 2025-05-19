import { SocialNetwork } from "../types"
import { FaFacebook, FaGithub, FaInstagram, FaXTwitter, FaYoutube, FaTiktok, FaTwitch, FaLinkedin } from "react-icons/fa6"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
type LinkHubLinkProps = {
    link: SocialNetwork
}

export default function LinkHubLink({ link }: LinkHubLinkProps) {
    const { attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: link.id
    })

   const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

    const icons: Record<string, React.ReactNode> = {
        facebook: <FaFacebook className="w-5 h-5" />,
        github: <FaGithub className="w-5 h-5" />,
        instagram: <FaInstagram className="w-5 h-5" />,
        x: <FaXTwitter className="w-5 h-5" />,
        youtube: <FaYoutube className="w-5 h-5" />,
        tiktok: <FaTiktok className="w-5 h-5" />,
        twitch: <FaTwitch className="w-5 h-5" />,
        linkedin: <FaLinkedin className="w-5 h-5" />,
    }

    const colors: Record<string, string> = {
        facebook: "bg-blue-600 hover:bg-blue-700 text-white",
        github: "bg-gray-800 hover:bg-gray-900 text-white",
        instagram: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white",
        x: "bg-black hover:bg-gray-800 text-white",
        youtube: "bg-red-600 hover:bg-red-700 text-white",
        tiktok: "bg-black hover:bg-gray-800 text-white",
        twitch: "bg-purple-600 hover:bg-purple-700 text-white",
        linkedin: "bg-blue-500 hover:bg-blue-600 text-white",
    }

    return (
        <li 
      ref={setNodeRef}
      style={style}
            className={`${colors[link.name] || "bg-slate-100 hover:bg-slate-200 text-black"} 
            px-10 py-2 flex items-center gap-3 rounded-lg 
            shadow-sm hover:shadow-md cursor-pointer`}
      {...attributes}
      {...listeners}
        >
            <div className="flex items-center justify-center w-6 h-6">
                {icons[link.name] || <FaGithub className="w-5 h-5" />}
            </div>
            <div className="flex-1 ">
                <p className="font-medium truncate capitalize">
                    {link.name}
                </p>

            </div>
        </li>
    )
}