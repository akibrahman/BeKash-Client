import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader";
import { AuthContext } from "../Providers/AuthProvider";

const AgentRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading || !user) return <Loader />;
  else if (user && user.role === "agent") {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }}></Navigate>;
  }
};

export default AgentRoute;
