import { useForm } from "react-hook-form";
import { UserLogin } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function Login() {
  const initialValues: UserLogin = {
    email: '',
    password: '',

  }
  const { register, handleSubmit, formState: { errors } } = useForm<UserLogin>({ defaultValues: initialValues })
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {

      navigate('/admin')
    }
  })

  const handleLogin = (FormData: UserLogin) => { mutate(FormData) }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-8 py-10 w-full max-w-md rounded-lg"
        noValidate
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Iniciar Sesión</h2>

        <div className="space-y-2">
          <div className="grid grid-cols-1 space-y-1">
            <label htmlFor="email" className="text-lg text-slate-700">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "El Email es obligatorio",
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
            <label htmlFor="password" className="text-lg text-slate-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password de Registro"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            className="bg-black p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer border border-black hover:bg-white hover:text-black hover:border-black transition duration-300"
            value="Iniciar Sesión"
          />

        </div>
      </form>
    </>
  );
}