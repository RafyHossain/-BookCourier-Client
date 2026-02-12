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
  FaClipboardList,
  FaBell
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
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: collapsed ? "88px" : "280px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`bg-white border-r border-slate-100 flex flex-col z-40
        ${mobileOpen ? "fixed inset-y-0 left-0 shadow-2xl" : "relative hidden lg:flex"} 
        flex-shrink-0 h-full`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-50 shrink-0">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
              <img src={logo} alt="BookFlow" className="h-8 w-auto object-contain" />
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#b91c1c] to-[#ef4444] tracking-tight">
                BookFlow
              </span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
          >
            {collapsed ? <FaBars size={14} /> : <FaChevronLeft size={14} />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          
          <NavItem to="/" icon={<FaHome />} label="Home" collapsed={collapsed} />

          <SectionLabel label="Personal" collapsed={collapsed} />
          
          <NavItem to="/dashboard/my-profile" icon={<FaUser />} label="My Profile" collapsed={collapsed} />
          <NavItem to="/dashboard/my-orders" icon={<FaShoppingCart />} label="My Orders" collapsed={collapsed} />
          <NavItem to="/dashboard/invoices" icon={<FaFileInvoice />} label="Invoices" collapsed={collapsed} />

          {role === "user" && (
            <NavItem to="/dashboard/librarian-request" icon={<FaBook />} label="Become Librarian" collapsed={collapsed} />
          )}

          {(role === "admin" || role === "librarian") && (
            <>
              <SectionLabel label="Management" collapsed={collapsed} />
              
              {role === "librarian" && (
                <NavItem to="/dashboard/add-book" icon={<FaBook />} label="Add Book" collapsed={collapsed} />
              )}

              {role === "admin" && (
                <>
                  <NavItem to="/dashboard/manage-users" icon={<FaUsers />} label="All Users" collapsed={collapsed} />
                  <NavItem to="/dashboard/manage-books" icon={<FaBookOpen />} label="Inventory" collapsed={collapsed} />
                  <NavItem to="/dashboard/librarian-requests" icon={<FaClipboardList />} label="Requests" collapsed={collapsed} />
                </>
              )}
            </>
          )}
        </div>

        <div className="p-4 border-t border-slate-50 shrink-0">
          <div className={`flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 ${collapsed ? "justify-center" : ""}`}>
             <div className="avatar online">
                <div className="w-9 h-9 rounded-full ring-1 ring-offset-2 ring-red-500">
                  <img src={user?.photoURL || "https://i.ibb.co/2kR8V2s/user.png"} alt="avatar" />
                </div>
             </div>
             {!collapsed && (
               <div className="flex-1 min-w-0 overflow-hidden">
                 <p className="text-sm font-bold text-slate-700 truncate">{user?.displayName?.split(" ")[0]}</p>
                 <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{role}</p>
               </div>
             )}
             {!collapsed && (
                <button onClick={handleLogout} className="text-slate-400 hover:text-red-600 transition-colors" title="Logout">
                   <FaSignOutAlt />
                </button>
             )}
          </div>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col min-w-0 h-full bg-[#F8FAFC]">
        
        <header className="h-20 px-8 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-30 shrink-0">
          
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <FaBars size={20} />
            </button>
            <h1 className="text-xl font-bold text-slate-800 hidden sm:block">Dashboard</h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-red-600 transition-colors">
              <FaBell size={18} />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="text-right hidden sm:block border-l border-slate-200 pl-6">
               <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Current Role</p>
               <p className="text-sm font-bold text-red-600 capitalize">{role}</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-7xl mx-auto"
          >
             <Outlet />
          </motion.div>
        </div>

      </main>
    </div>
  );
};

const SectionLabel = ({ label, collapsed }) => (
  !collapsed && (
    <div className="px-4 mt-6 mb-2">
      <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest pl-1">
        {label}
      </p>
    </div>
  )
);

// 🔥 FIX: NavItem Component (Ensures Visible Text)
const NavItem = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group my-1
        ${
          isActive
            ? "bg-red-600 text-white shadow-md shadow-red-500/40" // Solid Red BG ensures White text is visible
            : "text-slate-600 hover:bg-red-50 hover:text-red-600"
        }
        ${collapsed ? "justify-center px-0" : ""}`
      }
    >
      <span className="text-lg shrink-0">{icon}</span>
      
      {!collapsed && (
        <span className="font-medium text-[15px] tracking-wide">
          {label}
        </span>
      )}
    </NavLink>
  );
};

export default DashboardLayout;