import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/shared/Navbar";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <div className="flex min-h-screen">
            <Sidebar className="sticky top-20" />
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
