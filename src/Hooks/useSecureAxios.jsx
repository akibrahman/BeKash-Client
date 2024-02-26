import axios from "axios";
import { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  withCredentials: true,
});
const useSecureAxios = () => {
  // const { logOut, auth, setUser, setLoading } = useContext(AuthContext);
  //!
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        // console.log("Tracked in the Axios Interceptor - ", error.response);
        return error;
      }
    );
  }, []);
  //!
  return axiosInstance;
};

export default useSecureAxios;
