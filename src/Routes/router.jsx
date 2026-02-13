import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import Home from "../pages/Home/Home";
import AllBooks from "../pages/AllBooks/AllBooks";
import BookDetails from "../pages/BookDetails/BookDetails";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Dashboard Pages
import DashboardHome from "../pages/Dashboard/DashboardHome";
import MyOrder from "../pages/MyOrder/MyOrder";
import MyProfile from "../pages/MyProfile/MyProfile";
import Invoices from "../pages/Invoices/Invoices";
import Payment from "../Payment/Payment";
import LibrarianRequest from "../pages/LibrarianRequest/LibrarianRequest";
import MyWishlist from "../pages/MyWishlist/MyWishlist";

// Librarian
import AddBook from "../pages/AddBook/AddBook";
import MyBooks from "../pages/librarian/MyBooks";
import EditBook from "../pages/librarian/EditBook";
import LibrarianOrders from "../pages/librarian/LibrarianOrders";

// Admin
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import ManageBooks from "../pages/admin/ManageBooks";
import LibrarianRequests from "../pages/admin/LibrarianRequests";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import LibrarianRoute from "./LibrarianRoute";
import AdminRoute from "./AdminRoute";

// Optional 404 Page
// import NotFound from "../pages/NotFound/NotFound";

export const router = createBrowserRouter([

  // ================= PUBLIC =================
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "books", element: <AllBooks /> },

      {
        path: "books/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },
    ],
  },

  // ================= AUTH =================
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // ================= DASHBOARD =================
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [

     
      {
        index: true,
        element: <DashboardHome />
      },

      // -------- PROFILE --------
      { path: "my-profile", element: <MyProfile /> },
      { path: "overview", element: <DashboardHome></DashboardHome> },

      // -------- USER --------
      { path: "my-orders", element: <MyOrder /> },
      { path: "payment/:id", element: <Payment /> },
      { path: "invoices", element: <Invoices /> },
      { path: "wishlist", element: <MyWishlist /> },
      { path: "librarian-request", element: <LibrarianRequest /> },

      // -------- LIBRARIAN --------
      {
        path: "add-book",
        element: (
          <LibrarianRoute>
            <AddBook />
          </LibrarianRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <LibrarianRoute>
            <MyBooks />
          </LibrarianRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <LibrarianRoute>
            <EditBook />
          </LibrarianRoute>
        ),
      },
      {
        path: "librarian-orders",
        element: (
          <LibrarianRoute>
            <LibrarianOrders />
          </LibrarianRoute>
        ),
      },

      // -------- ADMIN --------
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooks />
          </AdminRoute>
        ),
      },
      {
        path: "librarian-requests",
        element: (
          <AdminRoute>
            <LibrarianRequests />
          </AdminRoute>
        ),
      },
    ],
  },

  // Optional Catch-All Route
  // {
  //   path: "*",
  //   element: <NotFound />
  // }

]);
