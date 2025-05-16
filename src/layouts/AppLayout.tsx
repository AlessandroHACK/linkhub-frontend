import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import LinkHub from "../components/LinkHub";

export default function AppLayout() {
    //proteger panel 
    const { data, isError, isLoading } = useAuth()

    if (isLoading) return <div className="min-h-screen my-60 text-center justify-center font-bold text-purple-700 text-2xl">Cargando...</div>
    if (isError) return <Navigate to='/auth/login' />
    if (data) return <LinkHub data={data}/>
}