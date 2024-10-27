import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import uploadImageToImgBB from "../imgBB/imgbb.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { FaFacebook, FaGithub, FaX } from "react-icons/fa6";
import { useForm } from "react-hook-form";

const Registration = () => {
  const { createUser, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const { name, email, password, phone, address } = data;

    try {
      await createUser(email, password, name, photoUrl, phone, address);
      reset();
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

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
      <div className="w-full my-8 flex justify-center items-center">
        <div className="w-3/4 lg:w-full max-w-2xl p-8 space-y-2 rounded-xl bg-gray-100 shadow-lg text-gray-900">
          <h1 className="text-2xl font-bold text-center text-[#0A1F44]">
            Register
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:grid lg:grid-cols-2 gap-x-8"
          >
            {/* Full Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1 text-sm">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1 text-sm">
              <label htmlFor="phone" className="block text-gray-600">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Phone"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-1 text-sm">
              <label htmlFor="address" className="block text-gray-600">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Address"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Photo */}
            <div className="space-y-1 text-sm col-span-2">
              <label htmlFor="photo" className="block text-gray-600">
                Upload Photo
              </label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500"
              />
              {photoUrl && (
                <p className="text-green-500 text-xs mt-1">
                  Image uploaded successfully!
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1 text-sm col-span-2">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid}
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
              className="p-3 rounded-full text-3xl"
            >
              <FaFacebook />
            </button>
            <button
              aria-label="Log in with Twitter"
              className="p-3 rounded-full text-3xl"
            >
              <FaX />
            </button>
            <button
              aria-label="Log in with GitHub"
              className="p-3 rounded-full text-3xl"
            >
              <FaGithub />
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
