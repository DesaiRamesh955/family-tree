import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <div className="px-10 mt-20 ">
        <Outlet />
      </div>
    </>
  );
}

export default App;
