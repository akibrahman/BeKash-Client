import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useSecureAxios from "../Hooks/useSecureAxios";
import { AuthContext } from "../Providers/AuthProvider";
import { camelCaseToCapitalized } from "../Utils/camelToCapitalize";

const ProfilePage = () => {
  const { logOut, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosInstance = useSecureAxios();
  const [blur, setBlur] = useState(true);
  //! Fetching Agents
  const { data: agents, refetch: agentRefetch } = useQuery({
    queryKey: ["agents", "for_admin"],
    queryFn: async () => {
      const res = await axiosInstance.get("/user/getagents");
      return res.data.agents;
    },
    enabled: user && user.role === "admin" ? true : false,
  });
  if (!user) return;
  if (user.role === "admin" && !agents) return;
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
        {user.role === "agent" && !user.isRoleVerified && !user.isBlocked ? (
          <p className="font-semibold text-primary">Wait for admin Approval</p>
        ) : user.role === "agent" && !user.isRoleVerified && user.isBlocked ? (
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="font-semibold text-primary">
              Admin declined your approval
            </p>
            <button className="bg-primary text-white font-semibold px-4 py-1 rounded-full duration-300 active:scale-90">
              Request Again
            </button>
          </div>
        ) : user.role === "agent" && user.isRoleVerified && user.isBlocked ? (
          <p className="font-semibold text-red-500">Admin Blocked you</p>
        ) : (
          user.role === "agent" && (
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
          )
        )}
        {user.role === "user" && (
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
        )}
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
      {/* User  */}
      {user.role === "user" && (
        <div className="border-t-2 border-primary px-8 py-2 grid grid-cols-2">
          <div className="">
            <p className="font-bold text-center text-primary">Service</p>
          </div>
          <div className="">
            <p className="font-bold text-center text-primary">Settings</p>
          </div>
        </div>
      )}
      {/* Admin  */}
      {user.role === "admin" && (
        <div className="grid grid-cols-4 p-5 border-t-2 border-primary px-6">
          <div className="">
            <p className="text-center font-semibold text-primary mb-3">
              Agents
            </p>
            {agents.map((agent) => (
              <div
                key={agent._id}
                className="flex flex-col gap-3 h-[600px] overflow-y-scroll pr-2"
              >
                <div className="flex flex-col items-center border border-primary py-3 rounded-xl">
                  <p className="font-semibold text-primary">{agent.name}</p>
                  <p className="font-semibold text-primary">{agent.email}</p>
                  <p className="font-semibold text-primary">
                    {agent.mobileNumber}
                  </p>
                  {!agent.isRoleVerified && !agent.isBlocked ? (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <button
                        onClick={async () => {
                          const res = await axiosInstance.post(
                            "/user/approveagent",
                            { id: agent._id }
                          );
                          if (res.data.success) {
                            toast.success("Agent Approved");
                          } else {
                            toast.error("Something went wrong");
                          }
                          await agentRefetch();
                        }}
                        className="text-white bg-green-500 px-3 py-1 rounded-full duration-300 active:scale-90"
                      >
                        Approve
                      </button>
                      <button
                        onClick={async () => {
                          const res = await axiosInstance.post(
                            "/user/rejectagent",
                            { id: agent._id }
                          );
                          if (res.data.success) {
                            toast.success("Agent Rejected");
                          } else {
                            toast.error("Something went wrong");
                          }
                          await agentRefetch();
                        }}
                        className="text-white bg-red-500 px-3 py-1 rounded-full duration-300 active:scale-90"
                      >
                        Rejecte
                      </button>
                    </div>
                  ) : !agent.isRoleVerified && agent.isBlocked ? (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <p className="font-semibold text-primary">Rejected</p>
                      <button
                        onClick={async () => {
                          const res = await axiosInstance.post(
                            "/user/approveagent",
                            { id: agent._id }
                          );
                          if (res.data.success) {
                            toast.success("Agent Approved");
                          } else {
                            toast.error("Something went wrong");
                          }
                          await agentRefetch();
                        }}
                        className="text-white bg-green-500 px-3 py-1 rounded-full duration-300 active:scale-90"
                      >
                        Approve
                      </button>
                    </div>
                  ) : agent.isRoleVerified && agent.isBlocked ? (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <p className="font-semibold text-primary">Blocked</p>
                      <button
                        onClick={async () => {
                          const res = await axiosInstance.post(
                            "/user/approveagent",
                            { id: agent._id }
                          );
                          if (res.data.success) {
                            toast.success("Agent Approved");
                          } else {
                            toast.error("Something went wrong");
                          }
                          await agentRefetch();
                        }}
                        className="text-white bg-green-500 px-3 py-1 rounded-full duration-300 active:scale-90"
                      >
                        Approve
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <p className="font-semibold text-primary">Verified</p>
                      <button
                        onClick={async () => {
                          const res = await axiosInstance.post(
                            "/user/blockuser",
                            { id: agent._id }
                          );
                          if (res.data.success) {
                            toast.success("Agent Blocked");
                          } else {
                            toast.error("Something went wrong");
                          }
                          await agentRefetch();
                        }}
                        className="text-white bg-red-500 px-3 py-1 rounded-full duration-300 active:scale-90"
                      >
                        Block
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-3">a</div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
