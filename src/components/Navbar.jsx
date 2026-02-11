import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthProvider";
import logo from "./../assets/bklogo.png";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");

  // ✅ Load saved theme on refresh
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  // ✅ Apply & Save theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        console.log("Logged out successfully");
      })
      .catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "hover:text-primary"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "hover:text-primary"
          }
        >
          Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "hover:text-primary"
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">

      {/* Left Section */}
      <div className="navbar-start">

        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <FaBars />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center ml-2">
          <div className="overflow-hidden h-14 w-20 flex items-center justify-center">
            <img
              src={logo}
              alt="BookCourier Logo"
              className="object-cover scale-150"
            />
          </div>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6 font-medium">
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

        {/* Auth Section */}
        {
          user ? (
            <div className="flex items-center gap-3">

              {/* User Photo */}
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoURL || "https://i.ibb.co/2kR8V2s/user.png"}
                    alt="User"
                  />
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-1 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
              >
                Logout
              </button>

            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-primary"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-outline btn-primary"
              >
                Sign Up
              </Link>
            </>
          )
        }

      </div>
    </div>
  );
};

export default Navbar;
