import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const AllUsers = () => {
  const { user, loading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5100/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

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
            prevUsers.map((singleUser) =>
              singleUser.email === email
                ? { ...singleUser, isAdmin: !isAdmin }
                : singleUser
            )
          );
        }
      })
      .catch((error) => console.error(error));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
      </div>
    );
  }

  if (!user) {
    navigate("/");
    return null; // Prevent rendering while navigating
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        All Users
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <table className="table table-xs bg-white dark:bg-gray-800">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="py-2 pl-2">No.</th>
              <th className="py-2 pl-2">Image</th>
              <th className="py-2 pl-2">Name</th>
              <th className="py-2 pl-2 hidden md:table-cell">Email</th>
              <th className="py-2 pl-2 hidden md:table-cell">Address</th>
              <th className="py-2 pl-2 hidden md:table-cell">Created At</th>
              <th className="py-2 pl-2 hidden md:table-cell">Last Logged In</th>
              <th className="py-2 pl-2">Role</th>
              <th className="py-2 pl-2">Status</th>
              {user?.isAdmin ? (
                <>
                  <th className="py-2 pl-2">Update User</th>
                  <th className="py-2 pl-2">Change Role</th>
                </>
              ) : (
                ""
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((singleUser, index) => (
              <tr
                key={singleUser.email}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
              >
                <td className="py-2 pl-2 text-gray-700 dark:text-gray-300">
                  {index + 1}
                </td>
                <td className="py-2 pl-2">
                  <div className="flex items-center">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={singleUser.photoURL || "default-avatar-url"} // Use a default avatar if needed
                          alt={`${singleUser.displayName || "User"} Avatar`}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-2 pl-2 text-gray-700 dark:text-gray-300">
                  {singleUser.displayName || "N/A"}
                </td>
                <td className="py-2 pl-2 hidden md:table-cell text-gray-700 dark:text-gray-300">
                  {singleUser.email}
                </td>
                <td className="py-2 pl-2 hidden md:table-cell text-gray-700 dark:text-gray-300">
                  {singleUser.address || "N/A"}
                </td>
                <td className="py-2 pl-2 hidden md:table-cell text-gray-700 dark:text-gray-300">
                  {new Date(singleUser.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 pl-2 hidden md:table-cell text-gray-700 dark:text-gray-300">
                  {new Date(singleUser.lastLoggedIn).toLocaleDateString() ||
                    "N/A"}
                </td>
                <td className="py-2 pl-2   text-gray-700 dark:text-gray-300">
                  {singleUser.isSuper
                    ? "Super Admin"
                    : singleUser.isAdmin
                    ? "Admin"
                    : "User"}
                </td>
                <td className="py-2 pl-2 text-gray-700 dark:text-gray-300">
                  {singleUser.isBlocked ? "Blocked" : "Active"}
                </td>
                {singleUser.isSuper ? (
                  <>
                    <td className="py-2 pl-2 text-3xl text-center text-gray-700 dark:text-gray-300">
                      <RiAdminFill />
                    </td>
                    <td className="py-2 pl-2 text-gray-700 dark:text-gray-300">
                      Immutable
                    </td>
                  </>
                ) : user?.isAdmin ? (
                  <>
                    <td className="py-2 pl-2 text-center">
                      <Link to={`/dashboard/edit-user/${singleUser.email}`}>
                        <FaEdit className="text-green-400 text-center text-2xl hover:text-blue-500 transition duration-150" />
                      </Link>
                    </td>
                    <td className="py-2 pl-2">
                      <input
                        type="checkbox"
                        className="toggle toggle-success toggle-sm"
                        checked={singleUser.isAdmin}
                        onChange={() =>
                          handleUserRole(singleUser.email, singleUser.isAdmin)
                        }
                      />
                    </td>
                  </>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

// import { useContext, useEffect, useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { RiAdminFill } from "react-icons/ri";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../providers/AuthProvider";

// const AllUsers = () => {
//   const { user, loading } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   if (loading) {
//     <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>;
//   }

//   useEffect(() => {
//     fetch("http://localhost:5100/users")
//       .then((res) => res.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.log(error));
//   }, []);

//   // Toggle user role between admin and user
//   const handleUserRole = (email, isAdmin) => {
//     fetch(`http://localhost:5100/users/${email}/role`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ isAdmin: !isAdmin }), // Toggle role
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.modifiedCount > 0) {
//           setUsers((prevUsers) =>
//             prevUsers.map((user) =>
//               user.email === email ? { ...user, isAdmin: !isAdmin } : user
//             )
//           );
//         }
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <>
//       {user ? (
//         user?.isAdmin ? (
//           <div>
//             <div className="overflow-x-auto">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>No.</th>
//                     <th>Image</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Address</th>
//                     <th>Created At</th>
//                     <th>Last Logged In</th>
//                     <th>Role</th>
//                     <th>Status</th>

//                     <th>Update User</th>
//                     <th>Change Role</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user, index) => (
//                     <tr key={index}>
//                       <th>{index + 1}</th>
//                       <td>
//                         <div className="flex items-center gap-3">
//                           <div className="avatar">
//                             <div className="mask mask-squircle h-12 w-12">
//                               <img
//                                 src={user.photoURL || "default-avatar-url"} // Add default avatar URL if needed
//                                 alt="User Avatar"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td>{user.displayName || "N/A"}</td>
//                       <td>{user.email}</td>
//                       <td>{user.address || "N/A"}</td>
//                       <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                       <td>
//                         {new Date(user.lastLoggedIn).toLocaleDateString() ||
//                           "N/A"}
//                       </td>
//                       <td>
//                         {user?.isSuper
//                           ? "Super Admin"
//                           : user.isAdmin
//                           ? "Admin"
//                           : "User"}
//                       </td>
//                       <td>{user.isBlocked ? "Blocked" : "Active"}</td>
//                       {user.isSuper ? (
//                         <>
//                           <td>
//                             <RiAdminFill />
//                           </td>
//                           <td>Immutable</td>
//                         </>
//                       ) : (
//                         <>
//                           <td>
//                             <Link to={`/dashboard/edit-user/${user.email}`}>
//                               <FaEdit className="text-center"></FaEdit>
//                             </Link>
//                           </td>
//                           <td>
//                             <input
//                               type="checkbox"
//                               className="toggle toggle-success toggle-sm"
//                               checked={user.isAdmin}
//                               onChange={() =>
//                                 handleUserRole(user.email, user.isAdmin)
//                               }
//                             />
//                           </td>
//                         </>
//                       )}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <div className="overflow-x-auto">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>No.</th>
//                     <th>Image</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Address</th>
//                     <th>Created At</th>
//                     <th>Last Logged In</th>
//                     <th>Role</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user, index) => (
//                     <tr key={index}>
//                       <th>{index + 1}</th>
//                       <td>
//                         <div className="flex items-center gap-3">
//                           <div className="avatar">
//                             <div className="mask mask-squircle h-12 w-12">
//                               <img
//                                 src={user.photoURL || "default-avatar-url"} // Add default avatar URL if needed
//                                 alt="User Avatar"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td>{user.displayName || "N/A"}</td>
//                       <td>{user.email}</td>
//                       <td>{user.address || "N/A"}</td>
//                       <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                       <td>
//                         {new Date(user.lastLoggedIn).toLocaleDateString() ||
//                           "N/A"}
//                       </td>
//                       <td>{user.isAdmin ? "Admin" : "User"}</td>
//                       <td>{user.isBlocked ? "Blocked" : "Active"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )
//       ) : (
//         navigate("/")
//       )}
//     </>
//   );
// };

// export default AllUsers;
