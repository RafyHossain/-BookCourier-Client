import { useState } from "react";
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";
import logo from "./../assets/bklogo.png";

import {
  FaBars,
  FaHome,
  FaUser,
  FaShoppingCart,
  FaBook,
  FaUsers,
  FaFileInvoice,
  FaBookOpen,
  FaChevronLeft,
  FaSignOutAlt,
  FaTruck,
  FaHeart,
  FaChartPie
} from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (roleLoading) {
    return <Loading></Loading>;
  }

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

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: collapsed ? "90px" : "280px" }}
        transition={{ duration: 0.3 }}
        className={`bg-slate-900 text-white flex flex-col z-50
        ${mobileOpen ? "fixed inset-y-0 left-0 shadow-2xl" : "hidden lg:flex"} 
        flex-shrink-0`}
      >

        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-700">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} className="h-8" alt="logo" />
              <span className="text-lg font-bold tracking-wide">
                BookCourier
              </span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex text-slate-400 hover:text-white"
          >
            {collapsed ? <FaBars /> : <FaChevronLeft />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">

          <NavItem to="/" icon={<FaHome />} label="Home" collapsed={collapsed} />

          {/* ===== DASHBOARD SECTION ===== */}
          <SectionLabel label="Dashboard" collapsed={collapsed} />

          <NavItem
            to="/dashboard/overview"
            icon={<FaChartPie />}
            label="Quick Overview"
            collapsed={collapsed}
          />

          <NavItem
            to="/dashboard/my-profile"
            icon={<FaUser />}
            label="My Profile"
            collapsed={collapsed}
          />

          {/* ===== USER PANEL ===== */}
          {role === "user" && (
            <>
              <SectionLabel label="User Panel" collapsed={collapsed} />

              <NavItem
                to="/dashboard/my-orders"
                icon={<FaShoppingCart />}
                label="My Orders"
                collapsed={collapsed}
              />

              <NavItem
                to="/dashboard/wishlist"
                icon={<FaHeart />}
                label="My Wishlist"
                collapsed={collapsed}
              />

              <NavItem
                to="/dashboard/invoices"
                icon={<FaFileInvoice />}
                label="Invoices"
                collapsed={collapsed}
              />
            </>
          )}

          {/* ===== LIBRARIAN ===== */}
          {role === "librarian" && (
            <>
              <SectionLabel label="Librarian Panel" collapsed={collapsed} />

              <NavItem
                to="/dashboard/add-book"
                icon={<FaBook />}
                label="Add Book"
                collapsed={collapsed}
              />

              <NavItem
                to="/dashboard/my-books"
                icon={<FaBookOpen />}
                label="My Books"
                collapsed={collapsed}
              />

              <NavItem
                to="/dashboard/librarian-orders"
                icon={<FaTruck />}
                label="Orders"
                collapsed={collapsed}
              />
            </>
          )}

          {/* ===== ADMIN ===== */}
          {role === "admin" && (
            <>
              <SectionLabel label="Admin Panel" collapsed={collapsed} />

              <NavItem
                to="/dashboard/manage-users"
                icon={<FaUsers />}
                label="All Users"
                collapsed={collapsed}
              />

              <NavItem
                to="/dashboard/manage-books"
                icon={<FaBookOpen />}
                label="Manage Books"
                collapsed={collapsed}
              />
            </>
          )}

        </div>

        <div className="p-4 border-t border-slate-700">
          <div className={`flex items-center gap-3 ${collapsed && "justify-center"}`}>
            <img
              src={user?.photoURL || "https://i.ibb.co/2kR8V2s/user.png"}
              className="w-9 h-9 rounded-full border border-slate-600"
              alt="user"
            />
            {!collapsed && (
              <>
                <div className="flex-1">
                  <p className="text-sm font-semibold truncate">
                    {user?.displayName}
                  </p>
                  <p className="text-xs text-red-400 capitalize">
                    {role}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-400"
                >
                  <FaSignOutAlt />
                </button>
              </>
            )}
          </div>
        </div>

      </motion.aside>

      <main className="flex-1 flex flex-col w-full">

        <header className="h-20 bg-white shadow-md flex items-center justify-between px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-slate-700"
          >
            <FaBars size={20} />
          </button>

          <h1 className="text-xl font-bold text-slate-700">
            Dashboard
          </h1>

          <div className="capitalize text-red-600 font-semibold">
            {role}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8 min-h-full"
          >
            <Outlet />
          </motion.div>
        </div>

      </main>
    </div>
  );
};

const SectionLabel = ({ label, collapsed }) =>
  !collapsed && (
    <div className="mt-6 mb-2 px-2">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );

const NavItem = ({ to, icon, label, collapsed }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
      ${
        isActive
          ? "bg-red-600 text-white shadow-md"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }
      ${collapsed ? "justify-center px-0" : ""}`
    }
  >
    <span className="text-lg">{icon}</span>
    {!collapsed && <span className="font-medium">{label}</span>}
  </NavLink>
);

export default DashboardLayout;
