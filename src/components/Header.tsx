import { useQueryClient } from "@tanstack/react-query"
import { User } from "../types"
import { UserIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom"

export default function Header() {
    const queryClient = useQueryClient()
    const data: User = queryClient.getQueryData(['user'])!

    return (
        <header className="bg-white shadow-sm py-4 sticky top-0 z-30 ">
            <div className="mx-auto max-w-5xl px-4 flex items-center justify-between">
            <div className="flex-1 text-center md:text-left">
  <Link 
    to="/" 
    className="text-2xl md:text-3xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
  >
    LinkHub
  </Link>
</div>
 
                <div className="flex items-center space-x-4">

                    <div className="relative group">
                        <button className="flex items-center space-x-2 focus:outline-none">
                            <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden">
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
                                    <UserIcon className="w-5 h-5 text-indigo-600" />
                                )}
                            </div>
                            <span className="hidden md:inline text-sm font-medium text-gray-700">
                                {data.name || data.handle}
                            </span>
                        </button>

                    
                    </div>
                </div>
            </div>
        </header>
    )
}