import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import logo from "../../assets/techTonic_croped-removebg.png";
import { IoMdLogOut } from "react-icons/io";
import LoadingSpinner from "./LoadingSpinner";

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  if (loading) {
    return <LoadingSpinner />;
  }

  const menu = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-r-2 border-orange-400 text-white px-4 py-2 rounded-xl font-semibold"
              : "text-white px-4 py-2"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-r-2 border-orange-400 text-white px-4 py-2 rounded-xl font-semibold"
              : "text-white px-4 py-2"
          }
        >
          Products
        </NavLink>
      </li>
    </>
  );

  return (
    // <div className="navbar fixed z-10 bg-opacity-50 bg-black text-white">
    <div className="sticky top-0 z-50 bg-[#0A1F44]">
      <div className="max-w-screen-xl mx-auto navbar  text-orange-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="flex flex-col space-y-8 dropdown-content bg-slate-300 dark:bg-slate-800 dark:bg-opacity-70 dark:backdrop-blur-sm dark:border-spacing-60 text-black dark:text-white  rounded-box z-[1] mt-3 w-52  p-4 shadow"
            >
              {menu}
            </ul>
          </div>
          <div className="flex items-center space-x-6">
            <img src={logo} className="w-16 h-16 hidden md:flex" alt="logo" />
            <Link to={"/"} className="text-xl font-semibold md:text-3xl">
              Tech Tonic
            </Link>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal gap-4 px-1">{menu}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 md:w-16 rounded-full border">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <div
                tabIndex={0}
                className="menu dropdown-content bg-slate-300 dark:bg-slate-800 dark:bg-opacity-70 dark:backdrop-blur-sm dark:border-spacing-60 text-black dark:text-white  rounded-box z-50 mt-3 w-96  p-4 shadow"
              >
                <div className="flex justify-center items-center flex-col space-y-2">
                  <p className="text-lg font-normal">{user?.email}</p>
                  <div className="avatar">
                    <div className="mask mask-squircle w-16">
                      <img src={user?.photoURL} />
                    </div>
                  </div>
                  <div className="badge badge-outline text-white">
                    {user?.isAdmin ? "Admin" : "User"}
                  </div>
                  <p className="text-center text-xl font-semibold">
                    Hello{" "}
                    <span className="text-lime-500 text-2xl font-semibold">
                      {user?.displayName}
                    </span>
                  </p>
                </div>
                <div className="flex justify-center flex-col">
                  <Link
                    to={"/dashboard/profile"}
                    className="w-1/3 mx-auto my-4 py-2 border border-cyan-500 rounded-2xl text-center"
                  >
                    Dashboard
                  </Link>
                  {/* <Link to={"/dashboard"}>Dashboard</Link> */}
                </div>
                <div className="w-1/3 mx-auto mt-8">
                  <Link onClick={logout}>
                    <button className="btn btn-md rounded-xl w-full bg-transparent text-white hover:bg-gray-900">
                      {" "}
                      <IoMdLogOut className="text-2xl"></IoMdLogOut>
                      <span>Log Out</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="border py-2 px-4 rounded-xl border-orange-300"
            >
              <button>Login/ Register</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
