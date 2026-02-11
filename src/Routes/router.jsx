import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllBooks from "../pages/AllBooks/AllBooks";

import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import LibrarianRoute from "./LibrarianRoute";
import AddBook from "../pages/AddBook/AddBook";
import AdminRoute from "./AdminRoute";
import MyOrder from "../pages/MyOrder/MyOrder";
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import BookDetails from "../pages/BookDetails/BookDetails";
import PrivateRoute from "./PrivateRoute";



export const router = createBrowserRouter([

  
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },

      { path: "books", element: <AllBooks /> },
      { path: "books/:id", element: <BookDetails /> },
    ],
  },

  // Auth Layout
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  //  Dashboard Layout (Protected)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [

      // User
      { path: "my-orders", element: <MyOrder /> },

      // Librarian
      {
        path: "add-book",
        element: (
          <LibrarianRoute>
            <AddBook />
          </LibrarianRoute>
        ),
      },

      // Admin
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);
