import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-base-100 text-base-content">

            <Navbar />

            <div className="flex-grow">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default MainLayout;
