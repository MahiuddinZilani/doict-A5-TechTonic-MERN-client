import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import {
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const badgeStyles = user.isAdmin
    ? "bg-red-600 text-white"
    : "bg-blue-500 text-white";

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-[#f4f7fb] min-h-[50vh] flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full md:w-2/3 p-8 md:p-10 text-[#0A1F44]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A1F44]">
              Profile Dashboard
            </h1>
            <Link
              to="/dashboard/edit-profile"
              className="text-gray-600 hover:text-[#0A1F44] text-2xl"
            >
              <FaEdit />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Profile Picture */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`${badgeStyles} text-sm font-medium py-1 px-3 rounded-full absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 shadow-md`}
              >
                {user.isAdmin ? "Admin" : "User"}
              </span>
            </div>

            {/* User Info */}
            <div className="flex flex-col gap-6 text-lg md:text-xl font-medium w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-[#0A1F44]">
                  <span className="text-gray-500">
                    <FaEnvelope />
                  </span>
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-[#0A1F44]">
                  <span className="text-gray-500">
                    <FaPhone />
                  </span>
                  <span>{user?.phone || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 text-[#0A1F44]">
                  <span className="text-gray-500">
                    <FaCalendarAlt />
                  </span>
                  <span>{user?.createdAt || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 text-[#0A1F44]">
                  <span className="text-gray-500">
                    <FaMapMarkerAlt />
                  </span>
                  <span>{user?.address || "N/A"}</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">
                  Hello, {user?.displayName || "User"}!
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
