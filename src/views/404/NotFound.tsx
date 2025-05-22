import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center max-w-2xl">
               
                <div className="mb-8 flex justify-center">
                    <FiAlertTriangle className="text-6xl text-indigo-600" />
                </div>
                
                {/* Texto principal */}
                <h1 className="text-5xl font-bold text-gray-500 mb-4">404</h1>
                <h2 className="text-4xl font-bold text-black mb-6">Página no encontrada</h2>
                
                {/* Mensaje descriptivo */}
                <p className="text-lg text-black mb-8">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                    Por favor, verifica la URL o navega de vuelta a nuestra página principal.
                </p>
                
                {/* Botón de acción con icono */}
                <Link
                    to="/"
                    className="inline-flex items-center  px-6 py-2 rounded-full bg-black text-white border  border-black hover:bg-white hover:text-black hover:border-black transition duration-300"
                >
                    <FaHome className="mr-2" />
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}