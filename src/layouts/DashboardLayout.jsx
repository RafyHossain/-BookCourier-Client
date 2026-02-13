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
  FaTruck
} from "react-icons/fa";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (roleLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="loading loading-ring loading-lg text-red-600"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ================= SIDEBAR ================= */}
      <motion.aside
        animate={{ width: collapsed ? "90px" : "280px" }}
        transition={{ duration: 0.3 }}
        className={`bg-white border-r border-slate-200 flex flex-col z-50
        ${mobileOpen ? "fixed inset-y-0 left-0 shadow-2xl" : "hidden lg:flex"} 
        flex-shrink-0`}
      >

        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} className="h-8" alt="logo" />
              <span className="text-xl font-bold text-primary">
                BookCourier
              </span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500 hover:text-red-600"
          >
            {collapsed ? <FaBars /> : <FaChevronLeft />}
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">

          <NavItem to="/" icon={<FaHome />} label="Home" collapsed={collapsed} />

          {/* ================= USER ================= */}
          {role === "user" && (
            <>
              <SectionLabel label="User Panel" collapsed={collapsed} />

              <NavItem
                to="/dashboard/my-profile"
                icon={<FaUser />}
                label="My Profile"
                collapsed={collapsed}
              />

              <NavItem
                to="/dashboard/my-orders"
                icon={<FaShoppingCart />}
                label="My Orders"
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

          {/* ================= LIBRARIAN ================= */}
          {role === "librarian" && (
            <>
              <SectionLabel label="Librarian Panel" collapsed={collapsed} />

              <NavItem
                to="/dashboard/my-profile"
                icon={<FaUser />}
                label="My Profile"
                collapsed={collapsed}
              />

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

          {/* ================= ADMIN ================= */}
          {role === "admin" && (
            <>
              <SectionLabel label="Admin Panel" collapsed={collapsed} />

              <NavItem
                to="/dashboard/my-profile"
                icon={<FaUser />}
                label="My Profile"
                collapsed={collapsed}
              />

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

        {/* ================= FOOTER ================= */}
        <div className="p-4 border-t">
          <div className={`flex items-center gap-3 ${collapsed && "justify-center"}`}>
            <img
              src={user?.photoURL || "https://i.ibb.co/2kR8V2s/user.png"}
              className="w-9 h-9 rounded-full"
              alt="user"
            />
            {!collapsed && (
              <div className="flex-1">
                <p className="text-sm font-bold truncate">
                  {user?.displayName}
                </p>
                <p className="text-xs text-red-500 capitalize">
                  {role}
                </p>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-600"
              >
                <FaSignOutAlt />
              </button>
            )}
          </div>
        </div>

      </motion.aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex flex-col">

        {/* Header */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-slate-600"
          >
            <FaBars size={20} />
          </button>

          <h1 className="text-lg font-bold text-secondary">
            Dashboard
          </h1>

          <div className="text-sm font-semibold text-red-600 capitalize">
            {role}
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </div>

      </main>
    </div>
  );
};

/* ================= COMPONENTS ================= */

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
          : "text-slate-600 hover:bg-red-50 hover:text-red-600"
      }
      ${collapsed ? "justify-center px-0" : ""}`
    }
  >
    <span className="text-lg">{icon}</span>
    {!collapsed && <span className="font-medium">{label}</span>}
  </NavLink>
);

export default DashboardLayout;
