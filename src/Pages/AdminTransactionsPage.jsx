import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useSecureAxios from "../Hooks/useSecureAxios";
import { AuthContext } from "../Providers/AuthProvider";

const AdminTransactionsPage = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useSecureAxios();
  const { data: transactions } = useQuery({
    queryKey: ["transactions", user?._id],
    queryFn: async ({ queryKey }) => {
      const res = await axiosInstance.post("/transactions/admin", {
        id: queryKey[1],
        role: user.role,
      });
      return res.data.transactions;
    },
    enabled: user ? true : false,
  });
  if (!transactions) return;
  return (
    <div>
      <div
        className={`w-[70%] mx-auto my-5 border rounded-md ${
          user.role === "user" ? "border-primary" : "border-secondary"
        }`}
      >
        <p
          className={`${
            user.role === "user" ? "bg-primary" : "bg-secondary"
          } text-white font-semibold py-2 text-center text-lg`}
        >
          System Transactions
        </p>
        {transactions.map((t) => (
          <div
            key={t._id}
            className="border p-4 m-2 rounded-md flex items-center justify-between px-10"
          >
            <div className="">
              <p className="ml-3 mb-1">
                Date: {new Date(t.createdAt).toLocaleString()}
              </p>
              <p
                className={`${
                  user.role === "user" ? "bg-primary" : "bg-secondary"
                } text-white font-semibold px-4 rounded-full`}
              >
                {t.transactionID}
              </p>
            </div>
            <div className="">
              {(t.methode == "Cash Out Bonus to Agent" ||
                t.methode == "Cash Out") &&
              user.role == "agent" ? (
                <p>Sender: {t.senderNumber}</p>
              ) : user.role == "user" && t.methode == "Cash In" ? (
                <p>Sender: {t.senderNumber}</p>
              ) : (
                <p>
                  Receiver: {t.receiverNumber ? t.receiverNumber : "BeKash"}
                </p>
              )}
            </div>
            <div className="">
              <p
                className={`font-bold ${
                  user.role === "user" ? "text-primary" : "text-secondary"
                }`}
              >
                {t.methode}-{t.amount} BDT
              </p>
            </div>
            <Link to={`/transaction/${t._id}`}>
              <p className="p-5 cursor-pointer">
                <FaArrowRight className="text-xl text-secondary" />
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTransactionsPage;
