import { useForm } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
import slugify from 'react-slugify'
import { useMutation } from '@tanstack/react-query'
import { searchByHandle } from '../api/UserAPI'
import { Link } from 'react-router-dom'


export default function SearchForm() {
    const { register, handleSubmit, watch, formState : {errors} } = useForm({
        defaultValues : {
            handle : ''
        }

    })
    const mutation =useMutation({
      mutationFn: searchByHandle
    })
    const handle = watch('handle')
    const handelSearch = () => {
      const slug = slugify(handle)
        mutation.mutate(slug)
    }

    return (
           <form
      onSubmit={handleSubmit(handelSearch)}
      className=" px-8 py-10 w-full max-w-md rounded-lg space-y-5 m-auto"
      noValidate
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Busca tu LinkHub</h2>

      <div className="grid grid-cols-1 space-y-1">

        <div className="flex items-center bg-slate-100 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 text-black">
          <span className="text-slate-500 mr-2">LinkHub.com/</span>
          <input
            id="handle"
            type="text"
            placeholder="elonmusk, zuck, jeffbezos"
            className="bg-transparent flex-1 border-none outline-none placeholder-slate-400"
            {...register('handle', {
              required: 'Un Nombre de Usuario es obligatorio',
            })}
          />
        </div>

        {errors.handle && (
          <ErrorMessage>{errors.handle.message}</ErrorMessage>
        )}
      </div>
        <div className='mt-10'>
          {mutation.isPending && <p className='text-center'>Cargando...</p>}
          {mutation.isError && <p className='text-center text-red-500 font-black'>{mutation.error.message}</p>}
           {mutation.data && <p className='text-center text-indigo-500 font-black'>{mutation.data} ir a <Link className='underline' to={'/auth/register'} state={{handle: slugify(handle)}}>Regsitro</Link></p>}
        </div>
      <input
        type="submit"
        value="Obtener mi LinkHub"
        className=" p-3 text-lg w-full uppercasebg-transparent border border-white text-white rounded-lg hover:bg-white hover:text-indigo-900 transition duration-300 "
      />
    </form>
    )
}
