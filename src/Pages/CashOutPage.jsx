import { useContext } from "react";
import toast from "react-hot-toast";
import useSecureAxios from "../Hooks/useSecureAxios";
import { AuthContext } from "../Providers/AuthProvider";

const CashOutPage = () => {
  const { user, authReloader, setAuthReloader } = useContext(AuthContext);
  const axiosInstance = useSecureAxios();
  const handleCashOut = async (e) => {
    e.preventDefault();
    const form = e.target;
    const mobileNumber = form.mobileNumber.value;
    const amount = form.amount.value;
    const pin = form.pin.value;
    if (!mobileNumber) {
      toast.error("Please enter your Mobile number!");
      return;
    }
    if (!pin) {
      toast.error("Please enter PIN!");
      return;
    }
    if (!amount) {
      toast.error("Please enter Amount!");
      return;
    }

    const bdPhoneRegex = /^(\+?88)?01[3-9]\d{8}$/;
    let tempMobileNumber = mobileNumber;

    if (!bdPhoneRegex.test(mobileNumber)) {
      toast.error(`'${mobileNumber}' is not a valid Mobile Number`);
      return;
    }
    if (amount < 50) {
      toast.error(`Amount should be more than or equal 50 BDT!`);
      return;
    }
    if (!/^\d+$/.test(pin)) {
      toast.error("PIN should be a number!");
      return;
    }
    if (pin.length != 4) {
      toast.error("PIN must be 4 digit!");
      return;
    }
    const numericOnly = mobileNumber.replace(/\D/g, "");
    if (numericOnly.startsWith("88")) {
      tempMobileNumber = "+" + numericOnly;
    } else if (numericOnly.startsWith("01") && numericOnly.length === 11) {
      tempMobileNumber = "+88" + numericOnly;
    } else {
      tempMobileNumber = mobileNumber;
    }
    try {
      const res = await axiosInstance.post("/cash-out", {
        email: user.email,
        mobileNumber: tempMobileNumber,
        amount: parseInt(amount),
        pin,
      });
      console.log(res?.data);
      if (!res.data.success) {
        toast.error(res.data.msg);
        return;
      } else {
        toast.success(res.data.msg);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setAuthReloader(!authReloader);
    }
  };
  return (
    <div className="flex items-center justify-center p-10">
      <div className="w-[500px] h-[450px] border border-primary rounded-xl">
        <p className="bg-primary text-white text-center font-semibold py-3 rounded-t-xl text-xl">
          Cash Out
        </p>
        <form
          onSubmit={handleCashOut}
          className="flex flex-col items-center justify-start pt-12 gap-5 h-full"
        >
          <div className="flex flex-col gap-1">
            <p className="font-semibold ml-4">Agent Mobile Number</p>
            <input
              placeholder="Enter Receiver Mobile Number"
              name="mobileNumber"
              className="bg-transparent w-[300px] border-primary border rounded-full px-8 py-2 font-semibold"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold ml-4">Amount</p>
            <input
              placeholder="Enter amount"
              name="amount"
              className="bg-transparent w-[300px] border-primary border rounded-full px-8 py-2 font-semibold"
              type="number"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold ml-4">PIN</p>
            <input
              placeholder="Enter PIN"
              name="pin"
              className="bg-transparent w-[300px] border-primary border rounded-full px-8 py-2 font-semibold"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white font-semibold px-6 py-2 rounded-full duration-300 active:scale-90 select-none"
          >
            Cash Out
          </button>
        </form>
      </div>
    </div>
  );
};

export default CashOutPage;
