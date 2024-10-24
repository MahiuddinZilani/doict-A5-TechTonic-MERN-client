import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Sidebar = () => {
  const { logout, user } = useContext(AuthContext);

  const dashboardMenu = (
    <>
      {user.isAdmin ? (
        <>
          <li>
            <NavLink
              to="/dashboard/profile"
              className="block p-4 hover:bg-gray-700"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/allUsers"}
              className="block p-4 hover:bg-gray-700"
            >
              All Users
            </NavLink>
          </li>
          <NavLink
            to={"/dashboard/addCategory"}
            className="block p-4 hover:bg-gray-700"
          >
            All Category
          </NavLink>
          <NavLink
            to={"/dashboard/addProduct"}
            className="block p-4 hover:bg-gray-700"
          >
            Add Product
          </NavLink>
          <NavLink
            to={"/dashboard/updateProduct"}
            className="block p-4 hover:bg-gray-700"
          >
            Update Product
          </NavLink>
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/dashboard/profile"
              className="block p-4 hover:bg-gray-700"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/carts"
              className="block p-4 hover:bg-gray-700"
            >
              My Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/reviews"
              className="block p-4 hover:bg-gray-700"
            >
              Add Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/payment"
              className="block p-4 hover:bg-gray-700"
            >
              My Payment
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white ">
      <div className="p-6">
        <h2 className="text-2xl font-bold">
          {user.isAdmin ? "Admin Dashboard" : "User Dashboard"}
        </h2>
      </div>
      <ul className="space-y-4 mx-4">
        {dashboardMenu}
        <button
          onClick={logout}
          className="btn w-full  my-16 bg-transparent text-white hover:text-black flex flex-col items-center"
        >
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
