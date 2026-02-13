import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useUserRole from "../hooks/useUserRole";
import Swal from "sweetalert2";
import logo from "./../assets/bklogo.png";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Logout",
    });

    if (result.isConfirmed) {
      try {
        await logoutUser();

        await Swal.fire({
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/login");
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-5 py-2 rounded-lg font-bold transition-all duration-300 text-sm ${
      isActive
        ? "btn-primary text-white shadow-lg shadow-red-500/40 transform scale-105"
        : "text-base-content/70 hover:text-red-600 hover:bg-red-50"
    }`;

  const navItems = (
    <>
      <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
      <li><NavLink to="/books" className={navLinkClass}>Books</NavLink></li>

      {user && (
        <li>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        </li>
      )}

      {!roleLoading && role === "admin" && (
        <li>
          <NavLink to="/dashboard/manage-users" className={navLinkClass}>
            Manage Users
          </NavLink>
        </li>
      )}

      {!roleLoading && role === "librarian" && (
        <li>
          <NavLink to="/dashboard/add-book" className={navLinkClass}>
            Add Book
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 lg:px-8 ${
        scrolled
          ? "bg-base-100/90 backdrop-blur-md shadow-sm border-b border-base-200 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="navbar-start w-auto lg:w-1/4">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-red-600">
            <FaBars className="text-xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-base-100 rounded-2xl w-64 gap-2 border border-base-200"
          >
            {navItems}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
          <img
            src={logo}
            alt="Logo"
            className="h-12 md:h-16 w-auto object-contain"
          />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">
          {navItems}
        </ul>
      </div>

      <div className="navbar-end flex-1 gap-3 justify-end">

        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle btn-sm hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          {theme === "light" ? <FaMoon size={16} /> : <FaSun size={18} className="text-yellow-500" />}
        </button>

        {user ? (
          <div className="flex items-center gap-4 pl-4 border-l border-base-300">

            <div className="flex flex-col items-end leading-tight">
              <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full uppercase tracking-wider border border-red-200">
                {role || "User"}
              </span>
            </div>

            <div
              className="tooltip tooltip-bottom tooltip-error font-bold z-50"
              data-tip={user.displayName}
            >
              <div className="avatar cursor-pointer online">
                <div className="w-10 h-10 rounded-full ring-2 ring-red-600 ring-offset-2 ring-offset-base-100 transition-transform hover:scale-110 shadow-lg shadow-red-500/20">
                  <img
                    src={user.photoURL || "https://i.ibb.co/2kR8V2s/user.png"}
                    alt="user"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-sm text-white font-bold px-6 rounded-lg btn-primary hover:from-red-800 hover:to-red-600 shadow-md shadow-red-500/30 border-none"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="btn btn-ghost btn-sm rounded-lg hover:text-red-600 hover:bg-red-50 font-bold"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm rounded-lg text-white font-bold px-6 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-800 hover:to-red-600 shadow-lg shadow-red-500/30 border-none"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
