import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import {
  FaUser,
  FaUsers,
  FaList,
  FaShoppingCart,
  FaComment,
  FaDollarSign,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { MdAddToPhotos } from "react-icons/md";

const Sidebar = () => {
  const { logout, user } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const dashboardMenu = (
    <>
      {user.isAdmin ? (
        <>
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center p-4 space-x-2 hover:bg-gray-700 ${
                  isActive ? "border-b-4 border-amber-500 rounded-lg" : ""
                }`
              }
            >
              <FaUser />
              {!isCollapsed && <span>Profile</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/allUsers"
              className={({ isActive }) =>
                `flex items-center p-4 space-x-2 hover:bg-gray-700 ${
                  isActive ? "border-b-4 border-amber-500 rounded-lg" : ""
                }`
              }
            >
              <FaUsers />
              {!isCollapsed && <span>All Users</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/carts"
              className={({ isActive }) =>
                `flex items-center p-4 space-x-2 hover:bg-gray-700 ${
                  isActive ? "border-b-4 border-amber-500 rounded-lg" : ""
                }`
              }
            >
              <FaShoppingCart />
              {!isCollapsed && <span>My Cart</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/allCategory"
              className={({ isActive }) =>
                `flex items-center p-4 space-x-2 hover:bg-gray-700 ${
                  isActive ? "border-b-4 border-amber-500 rounded-lg" : ""
                }`
              }
            >
              <FaList />

              {!isCollapsed && <span>All Category</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/allProducts"
              className={({ isActive }) =>
                `flex items-center p-4 space-x-2 hover:bg-gray-700 ${
                  isActive ? "border-b-4 border-amber-500 rounded-lg" : ""
                }`
              }
            >
              <MdAddToPhotos />
              {!isCollapsed && <span>All Products</span>}
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/dashboard/updateProduct"
              className={({ isActive }) =>
                `flex items-center p-4 space-x-2 hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaList />
              {!isCollapsed && <span>Update Product</span>}
            </NavLink>
          </li> */}
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center p-4 space-x-2 hover:bg-gray-700 ${
                  isActive ? "border-b-4 border-amber-500 rounded-lg" : ""
                }`
              }
            >
              <FaUser />
              {!isCollapsed && <span>Profile</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/allUsers"
              className={({ isActive }) =>
                `flex items-center p-4 space-x-2 hover:bg-gray-700 ${
                  isActive ? "border-b-4 border-amber-500 rounded-lg" : ""
                }`
              }
            >
              <FaUsers />
              {!isCollapsed && <span>All Users</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/carts"
              className={({ isActive }) =>
                `flex items-center p-4 space-x-2 hover:bg-gray-700 ${
                  isActive ? "border-b-4 border-amber-500 rounded-lg" : ""
                }`
              }
            >
              <FaShoppingCart />
              {!isCollapsed && <span>My Cart</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/reviews"
              className={({ isActive }) =>
                `flex items-center p-4 space-x-2 hover:bg-gray-700 ${
                  isActive ? "border-b-4 border-amber-500 rounded-lg" : ""
                }`
              }
            >
              <FaComment />
              {!isCollapsed && <span>Add Reviews</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/payment"
              className={({ isActive }) =>
                `flex items-center p-4 space-x-2 hover:bg-gray-700 ${
                  isActive ? "border-b-4 border-amber-500 rounded-lg" : ""
                }`
              }
            >
              <FaDollarSign />
              {!isCollapsed && <span>My Payment</span>}
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div
      className={`sticky top-20 flex flex-col items-center bg-[#0A1F44] text-white ${
        isCollapsed ? "w-20" : "w-64"
      } transition-width duration-300 h-[100vh]`}
    >
      <div className="p-4 flex justify-between items-center">
        <h2
          onClick={toggleSidebar}
          className={`text-2xl cursor-pointer font-bold ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          {user.isAdmin ? "Admin" : "User"} Dashboard
        </h2>
        <button
          onClick={toggleSidebar}
          className={`text-white ${isCollapsed ? "flex" : "hidden"}`}
        >
          <FaBars />
        </button>
      </div>
      <ul className="space-y-4">
        {dashboardMenu}
        <li>
          <button
            onClick={logout}
            className="flex items-center w-full p-4 space-x-2 hover:bg-gray-700"
          >
            <FaSignOutAlt />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
