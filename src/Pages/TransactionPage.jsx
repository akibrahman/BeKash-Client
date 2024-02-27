import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import useSecureAxios from "../Hooks/useSecureAxios";
import { AuthContext } from "../Providers/AuthProvider";

const TransactionPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosInstance = useSecureAxios();
  const { data: transaction } = useQuery({
    queryKey: ["transaction", id],
    queryFn: async ({ queryKey }) => {
      const res = await axiosInstance.get(
        `/transactions/id?id=${queryKey[1]}`,
        {
          id: queryKey[1],
          role: user.role,
        }
      );
      return res.data.transaction;
    },
    enabled: user ? true : false,
  });
  if (!transaction) return;
  return (
    <div>
      <div
        className={`w-[70%] mx-auto my-5 border rounded-md relative ${
          user.role === "user" ? "border-primary" : "border-secondary"
        }`}
      >
        <Link to={-1}>
          <FaArrowLeft className="absolute top-16 left-5 text-xl cursor-pointer" />
        </Link>
        <p
          className={`${
            user.role === "user" ? "bg-primary" : "bg-secondary"
          } text-white font-semibold py-2 text-center text-lg`}
        >
          Transaction Details
        </p>
        <div className="p-20 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-3">
            <p>
              <span className="bg-secondary w-[150px] inline-block text-white font-semibold text-center rounded-full py-1">
                Transaction ID:
              </span>{" "}
              {transaction.transactionID}
            </p>
            <p>
              <span className="bg-secondary w-[150px] inline-block text-white font-semibold text-center rounded-full py-1">
                Sender Number:
              </span>{" "}
              {transaction.senderNumber}
            </p>
            <p>
              <span className="bg-secondary w-[150px] inline-block text-white font-semibold text-center rounded-full py-1">
                Receiver Number:
              </span>{" "}
              {transaction.receiverNumber || "BeKash"}
            </p>
            <p>
              <span className="bg-secondary w-[150px] inline-block text-white font-semibold text-center rounded-full py-1">
                Type:
              </span>{" "}
              {transaction.methode}
            </p>
            <p>
              <span className="bg-secondary w-[150px] inline-block text-white font-semibold text-center rounded-full py-1">
                Amount:
              </span>{" "}
              {transaction.amount} BDT
            </p>
            <p>
              <span className="bg-secondary w-[150px] inline-block text-white font-semibold text-center rounded-full py-1">
                Date & Time:
              </span>{" "}
              {new Date(transaction.createdAt).toLocaleString()} BDT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
