import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { camelCaseToCapitalized } from "../Utils/camelToCapitalize";

const ProfilePage = () => {
  const { logOut, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [blur, setBlur] = useState(true);
  if (!user) return;
  return (
    <div>
      <div className="relative flex items-center justify-center gap-20 py-10">
        <button
          onClick={async () => {
            await logOut();
            navigate("/login");
          }}
          className="bg-red-600 text-white px-4 py-1 font-semibold rounded-full duration-300 active:scale-90 absolute top-3 left-3"
        >
          Logout
        </button>
        <p
          onClick={() => {
            setBlur(false);
            const intervalId = setInterval(() => {
              clearInterval(intervalId);
              setBlur(true);
            }, 3000);
          }}
          className="border-2 px-3 py-1 border-primary rounded-full cursor-pointer"
        >
          <span
            onClick={() => {
              setBlur(false);
              const intervalId = setInterval(() => {
                setBlur(true);
                clearInterval(intervalId);
              }, 3000);
            }}
            className={`font-semibold text-primary select-none ${
              blur ? "blur-sm" : "blur-0"
            }`}
          >
            {" "}
            {user.balance} /- BDT
          </span>
        </p>
        <img
          src={user.profilePicture}
          className="w-32 h-32 rounded-full border-2 border-primary"
          alt=""
        />
        <div className="border-l-2 border-primary pl-5 py-2 font-semibold space-y-1">
          <p>
            {user.name} - NID:{user.nid}
          </p>
          <p>
            {user.email} - {user.mobileNumber}
          </p>
          <p className="text-white bg-primary text-center rounded-xl">
            {camelCaseToCapitalized(user.role)}
          </p>
          <p className="text-white bg-primary text-center rounded-xl">
            {user.isRoleVerified ? "Verified" : "Not Verified"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
