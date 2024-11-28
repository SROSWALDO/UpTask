import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthLayout() {
  return (
    <>
    <div className="bg-gray-800 min-h-screen">
        <div className="py-10 lg:py-12 mx-auto w-[450px]">
            <Logo/>
            <div className="mt-10">
            <Outlet/>
            </div>
        </div>
    </div>

    <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        autoClose={2000}
      />
      
    </>
  )
}
