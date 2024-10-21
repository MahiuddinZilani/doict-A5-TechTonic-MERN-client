import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold">User Profile</h1>
      <div className="flex justify-center items-center flex-col space-x-6 mt-4">
        <img
          className="w-24 h-24 md:w-48 md:h-48 rounded-full"
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
