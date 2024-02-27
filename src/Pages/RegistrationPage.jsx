import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useSecureAxios from "../Hooks/useSecureAxios";
import { AuthContext } from "../Providers/AuthProvider";
import { imageToBase64 } from "../Utils/imageToBase64";
import { imageUpload } from "../Utils/imageUpload";

const RegistrationPage = () => {
  const [preview, setPreview] = useState(null);
  const { authReloader, setAuthReloader } = useContext(AuthContext);
  const [role, setRole] = useState("user");
  const axiosInstance = useSecureAxios();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = e.target;
    const name = data.name.value;
    const mobileNumber = data.mobileNumber.value;
    const email = data.email.value;
    const nid = data.nid.value;
    const pin = data.pin.value;
    if (!name) {
      toast.error("Please enter your Name!");
      return;
    }
    if (!mobileNumber) {
      toast.error("Please enter your Mobile number!");
      return;
    }
    if (!email) {
      toast.error("Please enter your E-mail!");
      return;
    }
    if (!nid) {
      toast.error("Please enter your NID!");
      return;
    }
    if (!pin) {
      toast.error("Please enter PIN!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const bdPhoneRegex = /^(\+?88)?01[3-9]\d{8}$/;
    let tempMobileNumber = mobileNumber;

    if (!bdPhoneRegex.test(mobileNumber)) {
      toast.error(`'${mobileNumber}' is not a valid Mobile Number`);
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error(`'${email}' is not a valid E-mail`);
      return;
    }
    if (!/^\d+$/.test(nid)) {
      toast.error("NID should be a number!");
      return;
    }
    if (nid.length != 10 && nid.length != 13) {
      toast.error("NID should be 10 or 13 digit!");
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
    if (!preview) {
      toast.error("Please select Image!");
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
    const url = await imageUpload(data.profilePicture.files[0]);
    const user = {
      name,
      mobileNumber: tempMobileNumber,
      email,
      nid,
      pin,
      profilePicture: url,
      role,
    };
    try {
      const res = await axiosInstance.post("/user/register", user);
      console.log(res);
      if (res?.response?.data?.error.code == 11000) {
        let [errorOne] = Object.keys(res.response.data.error.keyPattern);
        // if(errorOne=='email'){
        toast.error(`Account already exists with this ${errorOne}`);
        // }
      } else {
        setAuthReloader(!authReloader);
        toast.success("Registration successfull");
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.error.code == 11000) {
        let [errorOne] = Object.keys(error.response.data.error.keyPattern);
        // if(errorOne=='email'){
        toast.error(`Account already exists with this ${errorOne}`);
        // }
      } else {
        toast.error("Something went wrong, Try again!");
      }
    }
  };
  return (
    <div className="">
      <div className="w-[400px] md:w-[700px] md:h-[500px] border border-primary rounded-xl mx-auto my-10">
        <p className="bg-primary text-white text-center font-semibold py-3 rounded-t-xl text-xl">
          Registration
        </p>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-start py-10 gap-5"
        >
          <div className="flex items-centerj justify-center gap-5">
            <p
              onClick={() => setRole("user")}
              className={`font-semibold px-5 py-1.5 border cursor-pointer duration-300 active:scale-90 select-none rounded-full ${
                role === "user"
                  ? "bg-primary text-white border-primary"
                  : "text-primary bg-white border-primary"
              }`}
            >
              User
            </p>
            <p
              onClick={() => setRole("agent")}
              className={`font-semibold px-5 py-1.5 border cursor-pointer duration-300 active:scale-90 select-none rounded-full ${
                role === "agent"
                  ? "bg-primary text-white border-primary"
                  : "text-primary bg-white border-primary"
              }`}
            >
              Agent
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <div className="flex flex-col gap-1">
              <p className="font-semibold ml-4">Name</p>
              <input
                placeholder="Full Name"
                name="name"
                className="bg-transparent w-[300px] border-primary border rounded-full px-8 py-2 font-semibold"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold ml-4">Mobile Number</p>
              <input
                placeholder="Mobile Number"
                name="mobileNumber"
                className="bg-transparent w-[300px] border-primary border rounded-full px-8 py-2 font-semibold"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <div className="flex flex-col gap-1">
              <p className="font-semibold ml-4">E-mail</p>
              <input
                placeholder="Your E-mail"
                name="email"
                className="bg-transparent w-[300px] border-primary border rounded-full px-8 py-2 font-semibold"
                type="email"
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
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <div className="flex flex-col gap-1">
              <p className="font-semibold ml-4">NID</p>
              <input
                placeholder="Number of NID"
                name="nid"
                className="bg-transparent w-[300px] border-primary border rounded-full px-8 py-2 font-semibold"
                type="number"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold ml-4">Profile Picture</p>
              <input
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                type="file"
                className="hidden"
                onChange={async (e) => {
                  const data = await imageToBase64(e.target.files[0]);
                  setPreview(data);
                }}
              />
              <label
                htmlFor="profilePicture"
                className="bg-transparent w-[300px] border-primary border rounded-full px-8 py-1 flex items-center justify-end gap-10 font-bold text-primary cursor-pointer"
              >
                + Add Picture
                <img
                  className="w-8 h-8 rounded-full"
                  src={preview ? preview : "/nouser.png"}
                  alt=""
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col md:flex-row flex-col items-center gap-2">
            <button
              type="submit"
              className="bg-primary text-white font-semibold px-6 py-2 rounded-full duration-300 active:scale-90 select-none"
            >
              Register
            </button>
            <Link to="/login">
              <p className="text-primary font-bold">or, Login</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
