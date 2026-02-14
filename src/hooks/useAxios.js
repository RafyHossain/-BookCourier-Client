import axios from "axios";

// Public axios instance (no auth token)
const axiosInstance = axios.create({
  baseURL: "https://bookcourier-server-nu.vercel.app"
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;