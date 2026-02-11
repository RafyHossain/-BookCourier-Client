import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  return children;
};

export default PrivateRoute;
