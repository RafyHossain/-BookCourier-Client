import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Expires": "0"
  }
});

const useAxiosSecure = () => {

  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {

        if (user) {
          const token = await user.getIdToken(true);
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {

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
