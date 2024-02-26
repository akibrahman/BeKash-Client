import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const usePublicAxios = () => {
  return axiosInstance;
};

export default usePublicAxios;
