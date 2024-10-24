import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const AllUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5100/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);
  console.log(users);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table header */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Last Logged In</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Table rows for each cart item */}
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex users-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.displayName}</td>
                <td>Create</td>
                <td>Last Logged</td>
                <td>{user.isAdmin ? "Admin" : "User"}</td>
                <td>{user.isActive ? "Active" : "Blocked"}</td>
                <td>*</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
