import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const ProfilePage = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      <p>Profile</p>
      <button
        onClick={async () => {
          await logOut();
          navigate("/login");
        }}
        className="bg-red-600 text-white px-4 py-1 font-semibold rounded-full duration-300 active:scale-90"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
