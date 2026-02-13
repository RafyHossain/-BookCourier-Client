import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
  
    <div className="min-h-screen flex flex-col bg-base-200 text-base-content font-sans transition-colors duration-300">
      <ScrollRestoration />

      
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-24 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;