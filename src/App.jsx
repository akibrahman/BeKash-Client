import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <div className="">
        <NavBar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
