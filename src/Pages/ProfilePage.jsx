import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import useSecureAxios from "../Hooks/useSecureAxios";
import { AuthContext } from "../Providers/AuthProvider";
import { camelCaseToCapitalized } from "../Utils/camelToCapitalize";

const ProfilePage = () => {
  const { logOut, user } = useContext(AuthContext);
  const [systemBalance, setSystemBalance] = useState(0);
  const [agentNumber, setAgentNumber] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const navigate = useNavigate();
  const axiosInstance = useSecureAxios();
  const [blur, setBlur] = useState(true);
  useEffect(() => {
    axiosInstance.get("/system-balance").then((res) => {
      if (res.data.success) {
        setSystemBalance(res.data.systemBalance);
      } else {
        setSystemBalance(0);
      }
    });
  }, [axiosInstance]);
  //! Fetching Agents
  const { data: agents, refetch: agentRefetch } = useQuery({
    queryKey: ["agents", "for_admin", agentNumber],
    queryFn: async ({ queryKey }) => {
      const res = await axiosInstance.get(
        `/user/getagents?number=${queryKey[2]}`
      );
      //   const totalBalance = res.data.agents.reduce((a, c) => a + c.balance, 0);
      return res.data.agents;
    },
    enabled: user && user.role === "admin" ? true : false,
  });
  //! Fetching Users
  const { data: users, refetch: userRefetch } = useQuery({
    queryKey: ["users", "for_admin", userNumber],
    queryFn: async ({ queryKey }) => {
      const res = await axiosInstance.get(
        `/user/getusers?number=${queryKey[2]}`
      );
      //   const totalBalance = res.data.users.reduce((a, c) => a + c.balance, 0);
      return res.data.users;
    },
    enabled: user && user.role === "admin" ? true : false,
  });
  if (!user) return;
  //   if (user.role === "admin" && !users) return;
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
            <p
              className={`font-semibold ${
                user.role === "user" ? "text-primary" : "text-secondary"
              }`}
            >
              Admin declined your approval
            </p>
            <button
              className={`${
                user.role === "user" ? "bg-primary" : "bg-secondary"
              } text-white font-semibold px-4 py-1 rounded-full duration-300 active:scale-90`}
            >
              Request Again
            </button>
          </div>
        ) : (user.role === "agent" || user.role === "user") &&
          user.isRoleVerified &&
          user.isBlocked ? (
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
              className={`border-2 px-3 py-1 ${
                user.role === "user" ? "border-primary" : "border-secondary"
              } rounded-full ${
                user.isBlocked && !user.isRoleVerified
                  ? "pointer-events-none cursor-not-allowed"
                  : "pointer-events-auto cursor-pointer"
              }`}
            >
              <span
                onClick={() => {
                  setBlur(false);
                  const intervalId = setInterval(() => {
                    setBlur(true);
                    clearInterval(intervalId);
                  }, 3000);
                }}
                className={`font-semibold ${
                  user.role === "user" ? "text-primary" : "text-secondary"
                } select-none ${blur ? "blur-sm" : "blur-0"} ${
                  user.isBlocked && !user.isRoleVerified
                    ? "pointer-events-none cursor-not-allowed"
                    : "pointer-events-auto cursor-pointer"
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
            className={`border-2 px-3 py-1 ${
              user.role === "user" ? "border-primary" : "border-secondary"
            } rounded-full ${
              user.isBlocked
                ? "pointer-events-none cursor-wait"
                : "pointer-events-auto cursor-pointer"
            }`}
          >
            <span
              onClick={() => {
                setBlur(false);
                const intervalId = setInterval(() => {
                  setBlur(true);
                  clearInterval(intervalId);
                }, 3000);
              }}
              className={`font-semibold ${
                user.role === "user" ? "text-primary" : "text-secondary"
              } select-none ${blur ? "blur-sm" : "blur-0"} ${
                user.isBlocked
                  ? "pointer-events-none cursor-wait"
                  : "pointer-events-auto cursor-pointer"
              }`}
            >
              {" "}
              {user.balance} /- BDT
            </span>
          </p>
        )}

        {user.role === "admin" && (
          <p
            onClick={() => {
              setBlur(false);
              const intervalId = setInterval(() => {
                clearInterval(intervalId);
                setBlur(true);
              }, 3000);
            }}
            className={`flex flex-col items-center border-2 px-6 py-1 ${
              user.role === "user" ? "border-primary" : "border-secondary"
            } rounded-full cursor-pointer`}
          >
            <span className="font-semibold">Total Income</span>
            <span
              onClick={() => {
                setBlur(false);
                const intervalId = setInterval(() => {
                  setBlur(true);
                  clearInterval(intervalId);
                }, 3000);
              }}
              className={`font-semibold ${
                user.role === "user" ? "text-primary" : "text-secondary"
              } select-none ${blur ? "blur-sm" : "blur-0"}`}
            >
              {" "}
              {user.balance} /- BDT
            </span>
          </p>
        )}
        {user.role === "admin" && (
          <p
            onClick={() => {
              setBlur(false);
              const intervalId = setInterval(() => {
                clearInterval(intervalId);
                setBlur(true);
              }, 3000);
            }}
            className={`flex flex-col items-center border-2 px-6 py-1 ${
              user.role === "user" ? "border-primary" : "border-secondary"
            } rounded-full cursor-pointer`}
          >
            <span className="font-semibold">System Balance</span>
            <span
              onClick={() => {
                setBlur(false);
                const intervalId = setInterval(() => {
                  setBlur(true);
                  clearInterval(intervalId);
                }, 3000);
              }}
              className={`font-semibold ${
                user.role === "user" ? "text-primary" : "text-secondary"
              } select-none ${blur ? "blur-sm" : "blur-0"}`}
            >
              {" "}
              {systemBalance} /- BDT
            </span>
          </p>
        )}
        <img
          src={user.profilePicture}
          className={`w-32 h-32 rounded-full border-2 ${
            user.role === "user" ? "border-primary" : "border-secondary"
          }`}
          alt=""
        />
        <div
          className={`border-l-2 ${
            user.role === "user" ? "border-primary" : "border-secondary"
          } pl-5 py-2 font-semibold space-y-1`}
        >
          <p>
            {user.name} - NID:{user.nid}
          </p>
          <p>
            {user.email} - {user.mobileNumber}
          </p>
          <p
            className={`text-white ${
              user.role === "user" ? "bg-primary" : "bg-secondary"
            } text-center rounded-xl`}
          >
            {camelCaseToCapitalized(user.role)}
          </p>
          <p
            className={`text-white ${
              user.role === "user" ? "bg-primary" : "bg-secondary"
            } text-center rounded-xl`}
          >
            {user.isRoleVerified ? "Verified" : "Not Verified"}
          </p>
        </div>
      </div>
      {/* User  */}
      {user.role === "user" && (
        <div className="border-t-2 border-primary px-8 py-2 grid grid-cols-2">
          <div className="">
            <p className="font-bold text-center text-primary">Service</p>
            <div className="flex items-center justify-center gap-10 py-4">
              <Link to={user.isBlocked ? "" : "/send-money"}>
                <div className="flex flex-col items-center cursor-pointer select-none duration-300 active:scale-90">
                  <img
                    className="w-14 h-14 rounded-full border border-primary"
                    src="/sendmoney.png"
                    alt=""
                  />
                  <p className="text-primary font-semibold">Send Money</p>
                </div>
              </Link>
              <Link to={user.isBlocked ? "" : "/cash-out"}>
                <div className="flex flex-col items-center cursor-pointer select-none duration-300 active:scale-90">
                  <img
                    className="w-14 h-14 rounded-full border border-primary"
                    src="/cashout.png"
                    alt=""
                  />
                  <p className="text-primary font-semibold">Cash Out</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="px-20">
            <p className="font-bold text-center text-primary">Settings</p>
            <Link to={user.isBlocked ? "" : "/transactions"}>
              <button className="font-semibold bg-primary text-white px-4 py-1 rounded-full duration-300 active:scale-90">
                Transactions
              </button>
            </Link>
          </div>
        </div>
      )}
      {/* Agent  */}
      {user.role === "agent" && user.isRoleVerified && !user.isBlocked && (
        <div className="border-t-2 border-secondary px-8 py-2 grid grid-cols-2">
          <div className="">
            <p className="font-bold text-center text-secondary">Service</p>
            <div className="flex items-center justify-center gap-10 py-4">
              <Link to={user.isBlocked ? "" : "/cash-in"}>
                <div className="flex flex-col items-center cursor-pointer select-none duration-300 active:scale-90">
                  <img
                    className="w-14 h-14 rounded-full border border-secondary"
                    src="/cashout.png"
                    alt=""
                  />
                  <p className="text-secondary font-semibold">
                    Cash In to User
                  </p>
                </div>
              </Link>
              <button className="font-semibold text-white bg-secondary px-4 py-1 rounded-full duration-300 active:scale-90">
                Cash Request
              </button>
              <button className="font-semibold text-white bg-secondary px-4 py-1 rounded-full duration-300 active:scale-90">
                Withdraw Request
              </button>
            </div>
          </div>
          <div className="px-20">
            <p className="font-bold text-center text-secondary">Settings</p>
            <Link to={user.isBlocked ? "" : "/transactions"}>
              <button className="font-semibold bg-secondary text-white px-4 py-1 rounded-full duration-300 active:scale-90">
                Transactions
              </button>
            </Link>
          </div>
        </div>
      )}
      {/* Admin  */}
      {user.role === "admin" && (
        <div
          className={`grid grid-cols-4 p-5 border-t-2 ${
            user.role === "user" ? "border-primary" : "border-secondary"
          } px-6`}
        >
          {/* All Agents  */}
          <div className="h-[600px] overflow-y-scroll pr-2">
            <div className="flex items-center gap-3 mb-3">
              <p className="text-center font-semibold bg-secondary py-1 text-white rounded-full w-max px-6 mx-auto">
                Agents
              </p>
              <input
                className="bg-transparent border border-secondary px-3 py-1 rounded-full"
                placeholder="Mobile Number"
                type="text"
                onChange={(e) => setAgentNumber(e.target.value)}
              />
            </div>
            {agents?.map((agent) => (
              <div key={agent._id} className="flex flex-col gap-3 mb-3">
                <div className="flex relative flex-col items-center border border-primary py-3 rounded-xl">
                  <Link
                    to={`/transactions-user-wise?number=${agent.mobileNumber}`}
                  >
                    <p className="absolute bottom-2 right-4 bg-secondary text-white p-2 rounded-full duration-300 active:scale-90">
                      <FaArrowRight />
                    </p>
                  </Link>
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
                      <p className="font-bold text-green-600">Verified</p>
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
          {/* All Users  */}
          <div className="h-[600px] overflow-y-scroll px-2">
            <div className="flex items-center gap-3 mb-3">
              <p className="text-center font-semibold bg-secondary py-1 text-white rounded-full w-max px-6 mx-auto">
                Users
              </p>
              <input
                className="bg-transparent border border-secondary px-3 py-1 rounded-full"
                placeholder="Mobile Number"
                type="text"
                onChange={(e) => setUserNumber(e.target.value)}
              />
            </div>
            {users?.map((user) => (
              <div key={user._id} className="flex flex-col gap-3 mb-3">
                <div className="flex flex-col items-center border border-primary py-3 rounded-xl relative">
                  <Link
                    to={`/transactions-user-wise?number=${user.mobileNumber}`}
                  >
                    <p className="absolute bottom-2 right-4 bg-secondary text-white p-2 rounded-full duration-300 active:scale-90">
                      <FaArrowRight />
                    </p>
                  </Link>
                  <p className="font-semibold text-primary">{user.name}</p>
                  <p className="font-semibold text-primary">{user.email}</p>
                  <p className="font-semibold text-primary">
                    {user.mobileNumber}
                  </p>
                  {!user.isRoleVerified && !user.isBlocked ? (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <button
                        // onClick={async () => {
                        //   const res = await axiosInstance.post(
                        //     "/user/approveagent",
                        //     { id: agent._id }
                        //   );
                        //   if (res.data.success) {
                        //     toast.success("Agent Approved");
                        //   } else {
                        //     toast.error("Something went wrong");
                        //   }
                        //   await agentRefetch();
                        // }}
                        className="text-white bg-green-500 px-3 py-1 rounded-full duration-300 active:scale-90"
                      >
                        Approve
                      </button>
                      <button
                        // onClick={async () => {
                        //   const res = await axiosInstance.post(
                        //     "/user/rejectagent",
                        //     { id: agent._id }
                        //   );
                        //   if (res.data.success) {
                        //     toast.success("Agent Rejected");
                        //   } else {
                        //     toast.error("Something went wrong");
                        //   }
                        //   await agentRefetch();
                        // }}
                        className="text-white bg-red-500 px-3 py-1 rounded-full duration-300 active:scale-90"
                      >
                        Rejecte
                      </button>
                    </div>
                  ) : !user.isRoleVerified && user.isBlocked ? (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <p className="font-semibold text-primary">Rejected</p>
                      <button
                        // onClick={async () => {
                        //   const res = await axiosInstance.post(
                        //     "/user/approveagent",
                        //     { id: agent._id }
                        //   );
                        //   if (res.data.success) {
                        //     toast.success("Agent Approved");
                        //   } else {
                        //     toast.error("Something went wrong");
                        //   }
                        //   await agentRefetch();
                        // }}
                        className="text-white bg-green-500 px-3 py-1 rounded-full duration-300 active:scale-90"
                      >
                        Approve
                      </button>
                    </div>
                  ) : user.isRoleVerified && user.isBlocked ? (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <p className="font-semibold text-primary">Blocked</p>
                      <button
                        onClick={async () => {
                          const res = await axiosInstance.post(
                            "/user/approveagent",
                            { id: user._id }
                          );
                          if (res.data.success) {
                            toast.success("User Approved");
                          } else {
                            toast.error("Something went wrong");
                          }
                          await userRefetch();
                        }}
                        className="text-white bg-green-500 px-3 py-1 rounded-full duration-300 active:scale-90"
                      >
                        Approve
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <p className="font-bold text-green-600">Verified</p>
                      <button
                        onClick={async () => {
                          const res = await axiosInstance.post(
                            "/user/blockuser",
                            { id: user._id }
                          );
                          if (res.data.success) {
                            toast.success("User Blocked");
                          } else {
                            toast.error("Something went wrong");
                          }
                          await userRefetch();
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
          <div className="flex items-start justify-center mt-10">
            <Link to="/transactions-admin">
              <button className="font-semibold bg-secondary px-4 py-2 rounded-full duration-300 text-white active:scale-90">
                System Transactions
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
