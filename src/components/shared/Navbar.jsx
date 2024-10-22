import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const menu = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/products">All Products</NavLink>
      </li>
      {/* <li>
        <NavLink to="/login">Log In</NavLink>
      </li>
      <li>
        <NavLink to="/registration">Registration</NavLink>
      </li> */}
    </>
  );

  return (
    // <div className="navbar fixed z-10 bg-opacity-50 bg-black text-white">
    <div className="navbar bg-black text-white">
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
            className="menu menu-sm dropdown-content text-white bg-black bg-opacity-50 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {menu}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Tech Tonic</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menu}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border">
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
              </div>
            </div>
            <div
              tabIndex={0}
              className="menu dropdown-content text-black bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <div>
                <p className="">Name: {user?.displayName}</p>
                <p>Email: {user?.email}</p>
              </div>
              <div className="flex justify-start flex-col">
                <Link to={"/dashboard/profile"}>Profile</Link>
                <Link to={"/dashboard"}>Dashboard</Link>
              </div>
              <div className="w-full">
                <Link onClick={logout}>
                  <button className="btn w-full">Log Out</button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Link to={"/login"} className="btn btn-ghost">
            <button>Login/Register</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
