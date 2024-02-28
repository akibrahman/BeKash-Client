import axios from "axios";
import { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  withCredentials: true,
});
const useSecureAxios = () => {
  //!
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        // console.log("Tracked in the Axios Interceptor - ", error.response);
        // if (error.response.status === 401 || error.response.status === 403) {
        //   console.log("Problem with Token - ", error.response.status);
        //   logOut()
        //     .then(() => {
        //       navigate("/login");
        //     })
        //     .catch();
        // }
        return error;
      }
    );
  }, []);
  //!
  return axiosInstance;
};

export default useSecureAxios;
