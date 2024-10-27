import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaFacebook, FaGithub, FaX } from "react-icons/fa6";
import { useForm } from "react-hook-form";

const Login = () => {
  const { login, loginWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard/profile";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    login(email, password)
      .then(() => {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="my-8 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 bg-gray-200 dark:bg-gray-900 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-50 mb-6">
            Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1 text-sm">
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
              className="block w-full p-3 rounded-lg bg-[#0A1F44] font-semibold text-white hover:bg-transparent hover:border-2 hover:border-[#0A1F44] hover:text-[#0A1F44]"
            >
              Login
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
              onClick={async () => {
                const success = await loginWithGoogle();
                if (success) {
                  navigate(from, { replace: true });
                  console.log("Google login successful");
                }
              }}
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

          <p className="text-xs text-center text-gray-400 dark:text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link
              to={"/registration"}
              className="text-violet-400 dark:text-violet-600 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
