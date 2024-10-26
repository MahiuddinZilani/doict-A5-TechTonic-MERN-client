import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className="h-[70vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
