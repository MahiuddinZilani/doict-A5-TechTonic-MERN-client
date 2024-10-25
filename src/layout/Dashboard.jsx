import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/shared/Navbar";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <>
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
      </>
    );
  }

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 bg-gray-100 p-6">
              <h1 className="text-4xl font-bold mb-6">
                Welcome, {user?.displayName}!
              </h1>
              <Outlet />{" "}
            </div>
          </div>
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Dashboard;
