import { createContext, useEffect, useState } from "react";
import useSecureAxios from "../Hooks/useSecureAxios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosInstance = useSecureAxios();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReloader, setAuthReloader] = useState(true);

  //! User
  const getUser = async () => {
    try {
      const res = await axiosInstance.get("/user/find");
      if (res.code == "ERR_BAD_REQUEST") {
        setUser(null);
        return;
      }
      if (res.data.success) {
        setUser(res.data.user);
        console.log(res.data.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };
  useEffect(() => {
    getUser();
  }, [authReloader]);

  //! LogOut
  const logOut = async () => {
    // await axiosInstance.get("/user/logout");
    // toast.success("Logout Successful");
    // setAuthReloader(!authReloader);
  };

  //! LogIn
  const logIn = async (email, password) => {
    // const { data } = await axiosInstance.post("/user/login", {
    //   email,
    //   password,
    // });
    // if (data.status) {
    //   setAuthReloader(!authReloader);
    //   return { success: true };
    // } else {
    //   toast.error(data.msg);
    //   setAuthReloader(!authReloader);
    //   return { success: false };
    // }
  };
  const authInfo = {
    user,
    logOut,
    authReloader,
    setAuthReloader,
    logIn,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
