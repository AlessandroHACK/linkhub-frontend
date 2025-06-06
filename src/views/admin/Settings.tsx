import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { changePassword } from "../../api/UserAPI";
import { UpdateCurrentUserPasswordForm } from "../../types";

export default function Settings() {
    const initialValues :UpdateCurrentUserPasswordForm = {
        current_password: '',
        password: '',
        password_confirmation: ''
      };
      const { register, handleSubmit, watch,reset, formState: { errors } } = useForm({ defaultValues: initialValues });
      const password = watch('password');

      const { mutate } = useMutation({
        mutationFn: changePassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const handleChangePassword = (formData : UpdateCurrentUserPasswordForm) => { mutate(formData) };

    return (
        <form 
            className="bg-white shadow-md rounded-xl p-10 space-y-5"
            onSubmit={handleSubmit(handleChangePassword)}
        >
            <legend className="text-3xl font-bold mb-4 text-center">Cambiar Contraseña</legend>
            
            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="currentPassword">Contraseña Actual:</label>
                <input
                    type="password"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Contraseña Actual"
                    {...register("current_password", {
                        required: "El password actual es obligatorio",
                      })}
                    />
                    {errors.current_password && (
                      <ErrorMessage>{errors.current_password.message}</ErrorMessage>
                    )}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="newPassword">Nueva Contraseña:</label>
                <input
                    type="password"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Nueva Contraseña"
                    {...register("password", {
                        required: "El Nuevo Password es obligatorio",
                        minLength: {
                          value: 8,
                          message: 'El Password debe ser mínimo de 8 caracteres',
                        },
                      })}
                    />
                    {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="confirmPassword">Confirmar Nueva Contraseña:</label>
                <input
                    type="password"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Confirmar Nueva Contraseña"
                    {...register("password_confirmation", {
                        required: "Este campo es obligatorio",
                        validate: value => value === password || 'Los Passwords no son iguales',
                      })}
                    />
                    {errors.password_confirmation && (
                      <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
            </div>

            <input
                type="submit"
                className="bg-black p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer border border-black hover:bg-white hover:text-black hover:border-black transition duration-300"
                value='Guardar Cambios'
            />
        </form>
    );
}
