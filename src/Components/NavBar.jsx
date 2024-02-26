const NavBar = () => {
  return (
    <nav className=" bg-primary text-white py-4 font-semibold">
      <div className="flex items-center justify-between w-[80%] mx-auto">
        <p className="font-bold text-3xl">BeKash</p>
        <div className="flex items-center justify-center gap-10">
          <p>Home</p>
          <p className="bg-white text-primary px-4 py-1 rounded-full font-bold cursor-pointer select-none duration-300 active:scale-90">
            Login
          </p>
          <p>My Bekash</p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
