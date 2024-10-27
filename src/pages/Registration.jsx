import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import uploadImageToImgBB from "../imgBB/imgbb.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { FaFacebook, FaGithub, FaX } from "react-icons/fa6";

const Registration = () => {
  const { createUser, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  // State management for password visibility and form fields
  const [showPassword, setShowPassword] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const phone = form.phone.value;
    const address = form.address.value;

    try {
      await createUser(email, password, name, photoUrl, phone, address);
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    } finally {
      form.reset();
    }
  };

  // Upload file to ImgBB and set the photo URL
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await uploadImageToImgBB(file);
        setPhotoUrl(url);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <div className="w-full my-8 flex justify-center items-center ">
        <div className="w-3/4 lg:w-full max-w-2xl p-8 space-y-2 rounded-xl bg-gray-200  shadow-lg text-gray-900 ">
          <h1 className="text-2xl font-bold text-center text-[#0A1F44]">
            Register
          </h1>
          <form
            onSubmit={handleRegistration}
            className="lg:grid lg:grid-cols-2 gap-x-8"
          >
            {/* Full Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Name"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-1 text-sm">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1 text-sm">
              <label htmlFor="phone" className="block text-gray-600">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                placeholder="Phone"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500"
              />
            </div>

            {/* Address */}
            <div className="space-y-1 text-sm">
              <label htmlFor="address" className="block text-gray-600">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                required
                placeholder="Address"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500"
              />
            </div>

            {/* Photo */}
            <div className="space-y-1 text-sm col-span-2">
              <label htmlFor="photo" className="block text-gray-600">
                Upload Photo
              </label>
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-1 text-sm col-span-2">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  {/* {showPassword ? "Hide" : "Show"} */}
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full mt-4 p-3 rounded-lg bg-[#0A1F44] font-semibold text-white hover:bg-transparent hover:border-2 hover:border-[#0A1F44] hover:text-[#0A1F44] col-span-2"
            >
              Register
            </button>
          </form>

          <div className="flex items-center mt-6">
            <div className="flex-grow h-px bg-gray-700 dark:bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-400 dark:text-gray-600">
              or sign in with
            </span>
            <div className="flex-grow h-px bg-gray-700 dark:bg-gray-300"></div>
          </div>

          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={loginWithGoogle}
              aria-label="Log in with Google"
              className="p-3 rounded-full bg-gray-800 dark:bg-gray-200 hover:[#0A1F44]   transition duration-300"
            >
              <FaFacebook className="text-2xl" />
            </button>
            <button
              aria-label="Log in with Twitter"
              className="p-3 rounded-full bg-[#0A1F44] dark:bg-gray-200 hover:[#0A1F44]   transition duration-300"
            >
              <FaX className="text-2xl" />
            </button>
            <button
              aria-label="Log in with GitHub"
              className="p-3 rounded-full bg-gray-800 dark:bg-gray-200 hover:[#0A1F44]   transition duration-300"
            >
              <FaGithub className="text-2xl" />
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 pt-6">
            <span>Already have an account?</span>{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
