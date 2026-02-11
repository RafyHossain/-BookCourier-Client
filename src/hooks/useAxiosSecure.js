import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000"
});

const useAxiosSecure = () => {

  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    // Attach token before request
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {

        if (user) {
          const token = await user.getIdToken();
          config.headers.authorization = `Bearer ${token}`;
        }

        return config;
      }
    );

    // Handle unauthorized response
    const responseInterceptor = axiosSecure.interceptors.response.use(
      res => res,
      async error => {

        if (error.response?.status === 401 ||
            error.response?.status === 403) {

          await logoutUser();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };

  }, [user, logoutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
