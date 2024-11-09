import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import NavMenu from "../components/NavMenu";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function AppLayouts() {
  return (
    <>
      <header className="bg-gray-800 py-4">
        <div className="max-w-[1350px] mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-40">
            <Logo />
          </div>

          <NavMenu />
        </div>
      </header>
      <section className="max-w-[1350px] mx-auto mt-4 p-2">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} autoClose={2000} />
    </>
  );
}
