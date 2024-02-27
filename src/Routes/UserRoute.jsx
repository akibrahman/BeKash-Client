import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader";
import { AuthContext } from "../Providers/AuthProvider";

const UserRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (!user) return <Loader />;
  if (loading) return <Loader />;
  else if (user) return children;
  else return <Navigate to={"/"} state={{ from: location }} replace />;
};

export default UserRoute;
