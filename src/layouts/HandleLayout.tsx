import { Outlet } from "react-router-dom";

export default function HandleLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Columna izquierda (arriba en móvil) */}
 <div className="w-full md:w-1/2 bg-gradient-to-r from-black to-indigo-950 flex items-center justify-center py-8 md:py-0">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold">LinkHub</h1>
          <p className="mt-4">Administra tus redes sociales</p>
    
        </div>
      </div>

      {/* Columna derecha (abajo en móvil) */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center py-8 md:py-0 bg-white px-4">
        <Outlet />
      </div>
    </div>
  );
}
