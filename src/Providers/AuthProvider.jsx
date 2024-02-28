import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSecureAxios from "../Hooks/useSecureAxios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosInstance = useSecureAxios();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReloader, setAuthReloader] = useState(true);

  //! LogOut
  const logOut = async () => {
    setLoading(true);
    await axiosInstance.post("/user/logout", { email: user.email });
    toast.success("Logout Successful");
    setAuthReloader(!authReloader);
  };

  //! User
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/user/find");
      if (res.code == "ERR_BAD_REQUEST") {
        setUser(null);
        return;
      }
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, [authReloader]);

  const authInfo = {
    user,
    setUser,
    logOut,
    authReloader,
    setAuthReloader,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
