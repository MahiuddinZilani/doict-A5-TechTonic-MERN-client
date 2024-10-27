import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold">User Profile</h1>
      <div className="flex justify-center items-center flex-col ">
        <div className="w-full flex justify-end text-3xl">
          <Link to={"/dashboard/edit-profile"}>
            <FaEdit />
          </Link>
        </div>
        <hr className=" " />
        <div className="avatar my-4 p-4 flex flex-col items-center">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2 p-2">
            <img src={user.photoURL} />
          </div>
        </div>
        <div className="badge badge-primary   p-4 mx-auto justify-self-star">
          {user.isAdmin ? "Admin" : "User"}
        </div>
        <div className="w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-8 font-semibold text-2xl bg-white w-full px-4 py-8">
            <h2 className="text-2xl font-bold">Name: {user?.displayName}</h2>
            <p className="text-gray-600">
              <span>Email: </span>
              {user?.email}
            </p>
            <p>
              <span>Phone Number: </span>
              {user?.phone || null}
            </p>
            <p>
              <span>Created Date: </span>
              {user?.createdAt}
            </p>
            <p>
              <span>Address: </span>
              {user?.address || null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
