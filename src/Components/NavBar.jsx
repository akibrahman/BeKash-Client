import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <nav
      className={`${
        user?.role === "agent"
          ? "bg-secondary"
          : user?.role === "admin"
          ? "bg-secondary"
          : "bg-primary"
      } text-white py-4 font-semibold`}
    >
      <div className="flex items-center justify-between w-[80%] mx-auto">
        <p className="font-bold text-3xl">BeKash</p>
        <div className="flex items-center justify-center gap-10">
          <Link to="/">
            {" "}
            <p>Home</p>
          </Link>

          {user ? (
            <Link to="/profile">
              {" "}
              <p>My Bekash</p>
            </Link>
          ) : (
            <Link to="/login">
              <p className="bg-white text-primary px-4 py-1 rounded-full font-bold cursor-pointer select-none duration-300 active:scale-90">
                Login
              </p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
