import { useForm } from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ProfileForm, User } from "../../types"

import { toast } from "react-toastify"
import { updateProfile, uploadImage } from "../../api/ProfileAPI"
export default function Profile() {

    //obetenr datos de usario del chache alacenados por useAuth
    const queryClient = useQueryClient()
    const data: User = queryClient.getQueryData(['user'])!
   

     const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({ defaultValues:{
        handle: data.handle,
        description: data.description
     } })

     const UpdateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    data: data
                }
            })
        }
    })


    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    image: data
                }
            })
        }
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            uploadImageMutation.mutate(e.target.files[0])
        }
    }

    const handleUserProfileForm = (formData: ProfileForm) => {
        const user : User = queryClient.getQueryData(['user'])!
        user.description = formData.description
        user.handle = formData.handle
        UpdateProfileMutation.mutate(user)
    }
  return (
    <form 
        className="bg-white shadow-md rounded-xl p-10  space-y-5"
        onSubmit={handleSubmit(handleUserProfileForm)}
    >
        <legend className="text-3xl font-bold  mb-4 text-center">Editar Información</legend>
        <div className="grid grid-cols-1 gap-2">
            <label
                htmlFor="handle"
            >Handle:</label>
            <input
                type="text"
                className="border-none bg-slate-100 rounded-lg p-2"
                placeholder="handle o Nombre de Usuario"
                {...register('handle',{
                    required: 'El nombre de usuario es obligatorio'
                })}
            />
            {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
        </div>

        <div className="grid grid-cols-1 gap-2">
            <label
                htmlFor="description"
            >Descripción:</label>
            <textarea
                className="border-none bg-slate-100 rounded-lg p-2"
                placeholder="Tu Descripción"
                {...register('description')}
            />
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
        </div>

        <div className="grid grid-cols-1 gap-2">
            <label
                htmlFor="handle"
            >Imagen:</label>
            <input
                id="image"
                type="file"
                name="handle"
                className="border-none bg-slate-100 rounded-lg p-2"
                accept="image/*"
                onChange={handleChange}
            />
        </div>

        <input
            type="submit"
            className="bg-black p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer border border-black hover:bg-white hover:text-black hover:border-black transition duration-300"
            value='Guardar Cambios'
        />
    </form>
)
}
