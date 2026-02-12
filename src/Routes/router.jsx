import { createBrowserRouter } from "react-router-dom";

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

// User Dashboard Pages
import MyOrder from "../pages/MyOrder/MyOrder";
import MyProfile from "../pages/MyProfile/MyProfile";
import Invoices from "../pages/Invoices/Invoices";
import Payment from "../Payment/Payment";
import LibrarianRequest from "../pages/LibrarianRequest/LibrarianRequest";

// Librarian
import AddBook from "../pages/AddBook/AddBook";

// Admin
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import ManageBooks from "../pages/admin/ManageBooks";
import LibrarianRequests from "../pages/admin/LibrarianRequests";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import LibrarianRoute from "./LibrarianRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  // ===== PUBLIC ROUTES =====
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "books", element: <AllBooks /> },
      { path: "books/:id", element: <BookDetails /> },
    ],
  },

  // ===== AUTH ROUTES =====
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // ===== DASHBOARD ROUTES =====
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [

      // -------- USER --------
      {
        path: "my-orders",
        element: <MyOrder />,
      },
      {
        path: "payment/:id",
        element: <Payment />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "invoices",
        element: <Invoices />,
      },
      {
        path: "librarian-request",
        element: <LibrarianRequest />,
      },

      // -------- LIBRARIAN --------
      {
        path: "add-book",
        element: (
          <LibrarianRoute>
            <AddBook />
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
]);
