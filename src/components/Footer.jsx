import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/bklogo.png";

const Footer = () => {
    return (
        <footer className="bg-base-300 p-10 mt-20">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

                <div className="grid grid-cols-2 items-center">
                    <img src={logo} alt="" />
                    <div></div>
                    <p className="mt-3">
                        Library to your doorstep.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>Home</li>
                        <li>Books</li>
                        <li>Dashboard</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Follow Us</h3>
                    <div className="flex gap-4 text-xl">
                        <FaFacebook />
                        <FaGithub />
                        <FaXTwitter />
                    </div>
                </div>

            </div>

            <div className="text-center mt-8 text-sm">
                © {new Date().getFullYear()} BookCourier. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
