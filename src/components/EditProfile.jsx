import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import uploadImageToImgBB from "../imgBB/imgbb.config";
import { FaUserEdit } from "react-icons/fa";

const EditProfile = () => {
  const { user, loading, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  const handleProfileUpdateForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.displayName.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const photoFile = form.photoURL.files[0];
    const photoURL = await uploadImageToImgBB(photoFile);

    const userUpdateData = {
      displayName,
      phone,
      address,
      photoURL,
      uid: user.uid,
      email: user.email,
      isAdmin: user?.isAdmin,
      isBlocked: user?.isBlocked,
    };

    fetch(`http://localhost:5100/users/${user.email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userUpdateData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Profile updated successfully");
        setUser(userUpdateData);
        navigate("/dashboard/profile");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[50vh] p-4 bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <section className="w-full max-w-2xl p-8 bg-white shadow-xl rounded-lg border dark:bg-gray-800 border-gray-300 dark:border-gray-700">
        <div className="flex items-center mb-8">
          <FaUserEdit className="text-3xl text-blue-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Update Your Profile
          </h2>
        </div>

        <form onSubmit={handleProfileUpdateForm} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="displayName"
                className="text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                id="displayName"
                type="text"
                defaultValue={user.displayName}
                name="displayName"
                className="mt-2 w-full px-4 py-2 bg-blue-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                defaultValue={user.phone}
                name="phone"
                className="mt-2 w-full px-4 py-2 bg-blue-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                defaultValue={user.address}
                name="address"
                className="mt-2 w-full px-4 py-2 bg-blue-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="photoURL"
                className="text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Upload Profile Picture
              </label>
              <input
                id="photoURL"
                type="file"
                name="photoURL"
                className="mt-2 w-full px-4 py-2 bg-blue-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-6 py-2 font-semibold leading-5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
