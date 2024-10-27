import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

const EditUser = () => {
  const { loading } = useContext(AuthContext);
  const loadedUserData = useLoaderData();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleUserEditForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.displayName.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const photoURL = form.photoURL.value;

    const updateUserData = {
      displayName,
      phone,
      address,
      photoURL,
      uid: loadedUserData.uid,
      //   email: loadedUserData.email,
      isAdmin: loadedUserData.isAdmin,
      isBlocked: loadedUserData.isBlocked,
    };
    //     Update user data in the database
    fetch(`http://localhost:5100/users/${loadedUserData.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUserData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(`${displayName}'s information is updated successfully!`);
        // setUser(userUpdateData);
        navigate("/dashboard/allUsers");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };
  // console.log(user);
  return (
    <div>
      <section className="w-full p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Update {loadedUserData.displayName}
          {"'s "} Information{" "}
        </h2>
        <form onSubmit={handleUserEditForm}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="displayName"
              >
                Full Name
              </label>
              <input
                id="displayName"
                type="text"
                defaultValue={loadedUserData.displayName}
                name="displayName"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                defaultValue={loadedUserData.phone}
                name="phone"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="address"
              >
                Address
              </label>
              <input
                id="address"
                type="address"
                defaultValue={loadedUserData.address}
                name="address"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="photoURL"
              >
                Image
              </label>
              <input
                id="photoURL"
                type="url"
                defaultValue={loadedUserData.photoURL}
                name="photoURL"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditUser;

// const {
//     displayName,
//     phone,
//     address,
//     photoURL,
//     uid,
//     email,
//     isAdmin,
//     isBlocked,
//   } = useLoaderData();
