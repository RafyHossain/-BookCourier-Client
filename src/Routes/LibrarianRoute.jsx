import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";

const LibrarianRoute = ({ children }) => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <div>Loading...</div>;

  if (!user || role !== "librarian") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default LibrarianRoute;
