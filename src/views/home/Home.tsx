import RootFooter from "../../components/RootFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-indigo-950 flex flex-col justify-between text-white">
      {/* Contenido principal */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">Bienvenido a LinkHub</h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto">
            Administra y centraliza tus redes sociales en un solo lugar.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/auth/login"
              className="bg-white text-indigo-900 px-6 py-2 rounded-full hover:bg-indigo-100 transition duration-300 font-medium"
            >
              Iniciar Sesión
            </a>
            <a
              href="/auth/register"
              className="px-6 py-2 bg-transparent border border-white text-white rounded-full hover:bg-white hover:text-indigo-900 transition duration-300 font-medium"
            >
              Registrarse
            </a>
          </div>
        </div>
      </div>
      <RootFooter/>
    </div>
  );
}
