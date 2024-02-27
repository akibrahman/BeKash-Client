import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useSecureAxios from "../Hooks/useSecureAxios";
import { AuthContext } from "../Providers/AuthProvider";

const LoginPage = () => {
  const { authReloader, setAuthReloader } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosInstance = useSecureAxios();
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = e.target;
    const user = data.user.value;
    const pin = data.pin.value;
    if (!user) {
      toast.error("Please enter Mobile number or E-mail!");
      return;
    }
    if (!pin) {
      toast.error("Please enter PIN!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const bdPhoneRegex = /^(\+?88)?01[3-9]\d{8}$/;

    if (!emailRegex.test(user) && !bdPhoneRegex.test(user)) {
      toast.error(`'${user}' is nighter Mobile Number nor E-mail`);
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
    const res = await axiosInstance.post("/user/login", { user, pin });
    console.log(res);
    if (res?.code == "ERR_BAD_RESPONSE") {
      toast.error(res.response.data.msg);
    } else {
      if (res.data.success) {
        console.log(res);
        setAuthReloader(!authReloader);
        toast.success("Login Successfull");
        navigate("/profile");
      } else {
        toast.error(res.data.msg);
      }
    }
  };
  return (
    <div className="w-screen h-[calc(100vh-68px)] flex items-center justify-center">
      <div className="w-[400px] md:w-[500px] h-[400px] border border-primary rounded-xl">
        <p className="bg-primary text-white text-center font-semibold py-3 rounded-t-xl text-xl">
          Login
        </p>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-start pt-12 gap-5 h-full"
        >
          <div className="flex flex-col gap-1">
            <p className="font-semibold ml-4">Mobile Number or E-mail</p>
            <input
              placeholder="Number or E-mail"
              name="user"
              className="bg-transparent w-[300px] border-primary border rounded-full px-8 py-2 font-semibold"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold ml-4">PIN</p>
            <input
              placeholder="PIN"
              name="pin"
              className="bg-transparent w-[300px] border-primary border rounded-full px-8 py-2 font-semibold"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white font-semibold px-6 py-2 rounded-full duration-300 active:scale-90 select-none"
          >
            Login
          </button>
          <Link to="/registration">
            {" "}
            <p className="text-primary font-bold">or, Register</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
