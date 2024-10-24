import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
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

  // Toggle user role between admin and user
  const handleUserRole = (email, isAdmin) => {
    fetch(`http://localhost:5100/users/${email}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAdmin: !isAdmin }), // Toggle role
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.email === email ? { ...user, isAdmin: !isAdmin } : user
            )
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {user?.isAdmin ? (
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Created At</th>
                  <th>Last Logged In</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Update User</th>
                  <th>Change Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={user.photoUrl || "default-avatar-url"} // Add default avatar URL if needed
                              alt="User Avatar"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{user.displayName || "N/A"}</td>
                    <td>{user.email}</td>
                    <td>{user.address || "N/A"}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      {new Date(user.lastLoggedIn).toLocaleDateString() ||
                        "N/A"}
                    </td>
                    <td>{user.isAdmin ? "Admin" : "User"}</td>
                    <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                    <td>
                      <Link to={`/dashboard/edit-user/${user.email}`}>
                        <FaEdit className="text-center"></FaEdit>
                      </Link>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="toggle toggle-success toggle-sm"
                        checked={user.isAdmin}
                        onChange={() =>
                          handleUserRole(user.email, user.isAdmin)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Created At</th>
                  <th>Last Logged In</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={user.photoUrl || "default-avatar-url"} // Add default avatar URL if needed
                              alt="User Avatar"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{user.displayName || "N/A"}</td>
                    <td>{user.email}</td>
                    <td>{user.address || "N/A"}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      {new Date(user.lastLoggedIn).toLocaleDateString() ||
                        "N/A"}
                    </td>
                    <td>{user.isAdmin ? "Admin" : "User"}</td>
                    <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AllUsers;
