import axios from "axios";

// Public axios instance (no auth token)
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000"
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
