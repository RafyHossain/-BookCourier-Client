import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

// Simple custom hook to access auth context
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
