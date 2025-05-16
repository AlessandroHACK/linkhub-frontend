import { Link, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Columna izquierda (arriba en móvil) */}
      <div className="w-full md:w-1/2 bg-gradient-to-r from-black to-indigo-950 flex items-center justify-center py-8 md:py-0">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold">Bienvenido a LinkHub</h1>
          <p className="mt-4">Administra tus redes sociales</p>
          <div className="mt-8">
            <Link
              className="bg-white text-indigo-900 px-6 py-2 rounded-full hover:bg-indigo-100 transition duration-300"
              to="/auth/login"
            >
              Login
            </Link>
          </div>
          <div className="mt-6">
            <Link
              className="bg-transparent border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-indigo-900 transition duration-300"
              to="/auth/register"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Columna derecha (abajo en móvil) */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-8 md:py-0 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;