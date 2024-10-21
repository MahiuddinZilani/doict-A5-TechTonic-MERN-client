import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
      <ul className="space-y-4">
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
            to="/dashboard/orders"
            className="block p-4 hover:bg-gray-700"
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/settings"
            className="block p-4 hover:bg-gray-700"
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
