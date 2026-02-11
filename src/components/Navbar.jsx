import { Link, NavLink } from "react-router";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";
import logo from './../assets/bklogo.png';

const Navbar = () => {

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const navLinks = (
        <>
            <li>
                <NavLink to="/" className="hover:text-primary">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/books" className="hover:text-primary">
                    Books
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard" className="hover:text-primary">
                    Dashboard
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">

            {/* Logo */}
         <div className="navbar-start">
  <Link to="/" className="flex items-center">

    <div className="overflow-hidden h-14 w-20 flex items-center justify-center">
      <img
        src={logo}
        alt="BookCourier Logo"
        className="object-cover  scale-150"
      />
    </div>

  </Link>
</div>



            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4 font-medium">
                    {navLinks}
                </ul>
            </div>

            {/* Right Section */}
            <div className="navbar-end gap-3">

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="btn btn-ghost btn-circle"
                >
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                </button>

                {/* Login Button */}
                <Link
                    to="/login"
                    className="btn btn-primary"
                >
                    Login
                </Link>

            </div>
        </div>
    );
};

export default Navbar;
