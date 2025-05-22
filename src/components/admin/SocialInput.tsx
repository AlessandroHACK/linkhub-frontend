import { SocialLink } from "../../types"
import { FaFacebook, FaGithub, FaInstagram, FaXTwitter, FaYoutube, FaTiktok, FaTwitch, FaLinkedin } from "react-icons/fa6";
import { Switch } from '@headlessui/react'
import { classNames } from "../../utils";


type SocialInputprops = {
    item: SocialLink
    handleUrlChange : (e : React.ChangeEvent<HTMLInputElement>) => void 
    handleEnableLink: (SSsocialNetwork: string) => void
}
export default function SocialInput({ item , handleUrlChange, handleEnableLink }: SocialInputprops) {
    const icons: Record<string, React.ReactNode> = {
        facebook: <FaFacebook className="text-black w-8 h-8" />,
        github: <FaGithub className="text-black w-8 h-8" />,
        instagram: <FaInstagram className="text-black w-8 h-8" />,
        x: <FaXTwitter className="text-black w-8 h-8" />,
        youtube: <FaYoutube className="text-black w-8 h-8" />,
        tiktok: <FaTiktok className="text-black w-8 h-8" />,
        twitch: <FaTwitch className="text-black w-8 h-8" />,
        linkedin: <FaLinkedin className="text-black w-8 h-8" />,
    }
    return (
        <div className="bg-white p-3 rounded-2xl shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 flex justify-center items-center">
                {icons[item.name] || <FaGithub className="text-gray-400 w-8 h-8" />}
            </div>
            <input
                type="text"
                className="flex-1 border border-gray-100 rounded-lg"
                value={item.url}
                onChange={handleUrlChange}
                name={item.name}
            />
            <Switch
                checked={item.enabled}
                name={item.name}
                onChange={() =>  handleEnableLink(item.name)}
                className={classNames(
                    item.enabled ? 'bg-blue-500' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        item.enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                />
            </Switch>
        </div>
    );
}
