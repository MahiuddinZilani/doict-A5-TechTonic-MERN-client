import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import uploadImageToImgBB from "../imgBB/imgbb.config";

const EditProfile = () => {
  const { user, loading, setUser } = useContext(AuthContext);
  // const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleProfileUpdateForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.displayName.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const photoFile = e.target.photoURL.files[0];
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

    // console.log(userUpdateData);
    // Update user data in the database

    fetch(`http://localhost:5100/users/${user.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
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
  // console.log(user);
  return (
    <div>
      <section className="w-full p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Update Your Profile Information{" "}
        </h2>
        <form onSubmit={handleProfileUpdateForm}>
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
                defaultValue={user.displayName}
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
                defaultValue={user.phone}
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
                defaultValue={user.address}
                name="address"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="photoURL"
              >
                Upload Profile Picture
              </label>
              <input
                id="photoURL"
                type="file"
                // defaultValue={user.photoURL}
                name="photoURL"
                // onChange={handleImage}
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

export default EditProfile;
