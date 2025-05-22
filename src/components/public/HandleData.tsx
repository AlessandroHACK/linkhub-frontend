import { SocialNetwork, UserHandle } from "../../types"
import { UserIcon } from '@heroicons/react/20/solid'
import { FaFacebook, FaGithub, FaInstagram, FaXTwitter, FaYoutube, FaTiktok, FaTwitch, FaLinkedin } from "react-icons/fa6"
type HandleDataProps = {
  data: UserHandle
}

export default function HandleData({ data }: HandleDataProps) {
  //filtar links que esatn habilitados
  const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled)

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
    <div className="max-w-md mx-auto  p-6 rounded-2xl  space-y-6 text-black">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-28 h-28 rounded-full bg-slate-200 overflow-hidden shadow-lg flex items-center justify-center">
          {data.image ? (
            <img
              src={data.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <UserIcon className="w-12 h-12 text-gray-500" />
          )}
        </div>
        <h2 className="text-3xl font-extrabold text-black text-center tracking-tight">
          @{data.handle}
        </h2>
      </div>
      <p className="text-base text-gray-600 text-center leading-relaxed">
        {data.description}
      </p>
      {links.length ?
        links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${colors[link.name] || "bg-slate-100 hover:bg-slate-200 text-black"} 
      px-10 py-2 flex items-center justify-center gap-3 rounded-lg 
      shadow-sm hover:shadow-md cursor-pointer`}
          >
            {icons[link.name] || <FaGithub className="w-5 h-5" />}
            <span className="font-medium truncate capitalize text-center">
              {link.name}
            </span>
          </a>
        ))

        : <p className="text-center text-xl text-white">No hay enlaces disponibles</p>}
    </div>
  )
}
