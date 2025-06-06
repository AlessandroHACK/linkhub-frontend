import { useForm } from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage"
import { UserRegisterForm } from "../../types"
import { useMutation } from "@tanstack/react-query"
import { createAccount } from "../../api/AuthAPI"
import { toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"

export default function Register() {
    const location = useLocation()
    const initialValues: UserRegisterForm  = {
        name: '',
        email: '',
        handle: location?.state?.handle || '',
        password: '',
        password_confirmation: '',
      }
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegisterForm>({defaultValues : initialValues})
  const navigate = useNavigate()
  const {mutate} =useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data)=> {
      toast.success(data)
      reset()
      navigate('/auth/login')
    }
  })
  
  const password = watch('password')
  const handleRegister = (formData: UserRegisterForm) => {
    mutate(formData)
  }
  return (
    <>
      <form 
    onSubmit={handleSubmit(handleRegister)}
    className="bg-white px-8 py-10  w-full max-w-md"
>
    <h2 className="text-3xl font-bold  mb-4 text-center">Crear Cuenta</h2>

    <div className="space-y-2">
        <div className="grid grid-cols-1 space-y-1">
            <label htmlFor="name" className="text-lg text-slate-700">Nombre</label>
            <input
                id="name"
                type="text"
                placeholder="Tu Nombre"
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                {...register("name", {
                    required: "El Nombre de usuario es obligatorio",
                  })}
            />
            {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-1">
            <label htmlFor="email" className="text-lg text-slate-700">E-mail</label>
            <input
                id="email"
                type="email"
                placeholder="Email de Registro"
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                {...register("email", {
                    required: "El Email de registro es obligatorio",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "E-mail no válido",
                    },
                  })}
            />
            {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-1">
            <label htmlFor="handle" className="text-lg text-slate-700">Handle</label>
            <input
                id="handle"
                type="text"
                placeholder="Nombre de usuario: sin espacios"
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                {...register("handle", {
                    required: "El Handle es obligatorio",
                  })}
            />
            {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-1">
            <label htmlFor="password" className="text-lg text-slate-700">Password</label>
            <input
                id="password"
                type="password"
                placeholder="Password de Registro"
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                {...register("password", {
                    required: "El Password es obligatorio",
                    minLength: {
                      value: 8,
                      message: 'El Password debe ser mínimo de 8 caracteres'
                    }
                  })}
            />
            {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-1">
            <label htmlFor="password_confirmation" className="text-lg text-slate-700">Repetir Password</label>
            <input
                id="password_confirmation"
                type="password"
                placeholder="Repetir Password"
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                {...register("password_confirmation", {
                    required: "Repetir Password es obligatorio",
                    validate: value => value === password || 'Los Passwords no son iguales'
                  })}
            />
            {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
            type="submit"
           className="bg-black p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer border border-black hover:bg-white hover:text-black hover:border-black transition duration-300"
            value='Crear Cuenta'
        />
    </div>
</form>
      
    </>
  )
}
