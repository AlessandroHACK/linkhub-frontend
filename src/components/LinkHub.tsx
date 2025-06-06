
import { Link, Outlet } from 'react-router-dom'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { SocialNetwork, User } from '../types'
import { UserIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import LinkHubLink from './LinkHubLink'
import Sidebar from './Sidebar'
import { useQueryClient } from '@tanstack/react-query'
import RootFooter from './RootFooter'


type linkHubProps = {
    data: User
}
export default function LinkHub({ data }: linkHubProps) {
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    const queryClient = useQueryClient()
    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    }, [data])


    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e
        if (over && over.id) {
            const prevIndex = enabledLinks.findIndex(Link => Link.id === active.id)
            const newIndex = enabledLinks.findIndex(Link => Link.id === over.id)
            const order = arrayMove(enabledLinks, prevIndex, newIndex)
            setEnabledLinks(order)

            const disabledLinks: SocialNetwork = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled)
            const links = order.concat(disabledLinks)

            queryClient.setQueryData(['user'], (preData: User) => {

                return {
                    ...preData,
                    links: JSON.stringify(links)
                }
            })
        }
    }
    return (
        <> 

            <Sidebar />
            <main className="md:ml-64">
                <div className="bg-slate-100 min-h-screen py-10">
                    <main className="mx-auto max-w-5xl p-10 md:p-0">


                        <div className="flex justify-end">
                            <Link
                                className="font-bold text-right text-slate-800 text-xl"
                                to={`/${data.handle}`}
                                target="_blank"
                                rel="noreferrer noopener"
                            >Visitar Mi Perfil:  <span className='text-blue-500 underline'>/{data.handle}</span></Link>
                        </div>

                        <div className="flex flex-col md:flex-row gap-10 mt-10">
                            <div className="flex-1 ">
                                <Outlet />
                            </div>
                            <div className="w-full md:w-96  rounded-xl px-5 py-10 space-y-6">
                                {/* movil */}
                                <div className="flex justify-center items-center">
                                    <div className="relative border-gray-800 dark:border-gray-800 bg-gray-800 border-[12px] rounded-[2.2rem] h-[450px] w-[230px] flex items-center justify-center">
                                        {/* Botones laterales */}
                                        <div className="h-[28px] w-[3px] bg-gray-800 absolute -left-[14px] top-[60px] rounded-l-lg"></div>
                                        <div className="h-[36px] w-[3px] bg-gray-800 absolute -left-[14px] top-[110px] rounded-l-lg"></div>
                                        <div className="h-[42px] w-[3px] bg-gray-800 absolute -right-[14px] top-[120px] rounded-r-lg"></div>

                                        {/* Pantalla */}
                                        <div className="relative rounded-[1.8rem] overflow-hidden w-[210px] h-[430px] bg-white flex flex-col items-center justify-start pt-5">
                                            {/* Círculo con el icono */}
                                            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-3">
                                                {data.image ? (
                                                    <img src={data.image} alt="Image profile" className="w-20 h-20 rounded-full" />
                                                ) : (
                                                    <UserIcon className="w-12 h-12 text-gray-400" />
                                                )}
                                            </div>


                                            <div className="flex flex-col items-center px-4">
                                                <p className="text-lg text-black font-bold">{data.handle}</p>
                                                <p className="text-xs text-slate-700 text-center">{data.description}</p>
                                            </div>


                                            <div className="mt-4 w-full px-4 flex-1 overflow-y-auto">
                                                <DndContext
                                                    collisionDetection={closestCenter}
                                                    onDragEnd={handleDragEnd}
                                                    modifiers={[
                                                        ({ transform }) => ({
                                                            ...transform,
                                                            x: 0,
                                                        }),
                                                    ]}
                                                >
                                                    <div className="flex flex-col gap-3 pb-2 ">
                                                        <SortableContext
                                                            items={enabledLinks}
                                                            strategy={verticalListSortingStrategy}
                                                        >
                                                            {enabledLinks.map(link => (
                                                                <LinkHubLink
                                                                    key={link.name}
                                                                    link={link}
                                                                />
                                                            ))}
                                                        </SortableContext>
                                                    </div>
                                                </DndContext>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </main>
                </div>
            </main>
            <RootFooter/>
        </>
    )
}
