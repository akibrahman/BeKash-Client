const HomePage = () => {
  return (
    <div className="h-[80vh] md:h-screen flex flex-col md:flex-row items-center justify-center gap-10 md:gap-32">
      <div className="md:px-10 lg:px-0">
        <p className={`text-4xl md:text-6xl lg:text-8xl font-bold`}>
          Welcome to
        </p>
        <p
          className={`text-4xl md:text-6xl lg:text-8xl font-bold text-primary`}
        >
          BeKash
        </p>
        <p className="mt-3 font-semibold text-lg">Your Digital Transactions</p>
      </div>
      <div className="">
        <img src="/b.webp" className="w-[100px] md:w-[200px]" alt="" />
      </div>
    </div>
  );
};

export default HomePage;
