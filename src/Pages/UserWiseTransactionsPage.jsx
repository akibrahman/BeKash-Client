import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import useSecureAxios from "../Hooks/useSecureAxios";
import { AuthContext } from "../Providers/AuthProvider";

const UserWiseTransactionsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("number");
  const { user } = useContext(AuthContext);
  const axiosInstance = useSecureAxios();
  const { data: transactions } = useQuery({
    queryKey: ["transactions", query],
    queryFn: async ({ queryKey }) => {
      const res = await axiosInstance.post("/transactions/user-wise", {
        number: queryKey[1],
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
          Transactions
        </p>
        {transactions.map((t) => (
          <div
            key={t._id}
            className="border p-4 m-2 rounded-md flex-col md:flex-row gap-3 md:gap-0 flex items-center justify-between px-10"
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
                <>
                  <p>Sender: {t.senderNumber ? t.senderNumber : "BeKash"}</p>
                  <p>
                    Receiver: {t.receiverNumber ? t.receiverNumber : "BeKash"}
                  </p>
                </>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserWiseTransactionsPage;
