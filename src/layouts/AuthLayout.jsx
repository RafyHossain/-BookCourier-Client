import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5f2]">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-xl p-8 md:p-10 transition-all duration-300">

          <Outlet />

        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default AuthLayout;
