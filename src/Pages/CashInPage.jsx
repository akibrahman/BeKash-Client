const CashInPage = () => {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="w-[500px] h-[450px] border border-secondary rounded-xl">
        <p className="bg-secondary text-white text-center font-semibold py-3 rounded-t-xl text-xl">
          Cash In to User
        </p>
        <form
          //   onSubmit={handleLogin}
          className="flex flex-col items-center justify-start pt-12 gap-5 h-full"
        >
          <div className="flex flex-col gap-1">
            <p className="font-semibold ml-4">Receiver Mobile Number</p>
            <input
              placeholder="Enter Receiver Mobile Number"
              name="mobileNumber"
              className="bg-transparent w-[300px] border-secondary border rounded-full px-8 py-2 font-semibold"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold ml-4">Amount</p>
            <input
              placeholder="Enter amount"
              name="amount"
              className="bg-transparent w-[300px] border-secondary border rounded-full px-8 py-2 font-semibold"
              type="number"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold ml-4">PIN</p>
            <input
              placeholder="Enter PIN"
              name="pin"
              className="bg-transparent w-[300px] border-secondary border rounded-full px-8 py-2 font-semibold"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="bg-secondary text-white font-semibold px-6 py-2 rounded-full duration-300 active:scale-90 select-none"
          >
            Cash In
          </button>
        </form>
      </div>
    </div>
  );
};

export default CashInPage;
