import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/shared/Navbar";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-6">
          <h1 className="text-4xl font-bold mb-6">
            Welcome, {user?.displayName}!
          </h1>
          <Outlet />{" "}
          {/* This will render the selected section like Profile, Orders, etc. */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
