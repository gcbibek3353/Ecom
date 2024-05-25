import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";
import logo from "../assets/images/logo.jpg";
import { useUser } from "../hooks/useUser";

const Navbar = () => {
  const { logoutUser } = useUser();
  const [menu, setMenu] = useState(false);
  const user = useRecoilValue(userState);

  const handelLogOut = () => {
    logoutUser();
  };

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <div className="fixed w-full z-10">
      <div className="flex text-white flex-row justify-between p-5 md:px-32 px-5 bg-orange-600 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="flex flex-row items-center cursor-pointer">
          <h1 className="text-3xl font-semibold">
            <Link to="/">
              <img
                src={logo}
                className="h-12 w-12 cursor-pointer rounded-md"
                alt="logo"
              />
            </Link>
          </h1>
        </div>

        <nav className="text-lg font-medium hidden lg:flex flex-row items-center gap-8">
          <Link
            to="/"
            className="hover:border-white hover:border-b-2 cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:border-white hover:border-b-2 cursor-pointer"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:border-white hover:border-b-2 cursor-pointer"
          >
            Contact
          </Link>
          {user ? (
            user.role === "admin" ? (
              <Link
                to="/admin/dashboard" // Change the path according to your application
                className="hover:border-white hover:border-b-2 cursor-pointer"
                onClick={closeMenu}
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="hover:border-white hover:border-b-2 cursor-pointer"
                onClick={closeMenu}
              >
                Profile
              </Link>
            )
          ) : null}
          {user ? (
            <button
              onClick={handelLogOut}
              className="hover:border-white hover:border-b-2 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:border-white hover:border-b-2 cursor-pointer"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:border-white hover:border-b-2 cursor-pointer"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          )}
          <Link
            to="/track"
            className="hover:border-white hover:border-b-2 cursor-pointer"
          >
            Track Goods
          </Link>
        </nav>

        <div className="lg:hidden flex items-center cursor-pointer">
          {menu ? (
            <AiOutlineClose size={28} onClick={handleChange} />
          ) : (
            <RxHamburgerMenu size={28} onClick={handleChange} />
          )}
        </div>
      </div>
      <div
        className={`${
          menu ? "translate-x-0" : "translate-x-full"
        } lg:hidden flex flex-col absolute bg-black text-white left-0 top-20 font-semibold text-2xl text-center z-10 pt-8 gap-8 w-full h-fit transition-transform duration-300`}
      >
        <Link
          to="/"
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          About
        </Link>
        <Link
          to="/contact"
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          Contact
        </Link>
        {user ? (
          user.role === "admin" ? (
            <Link
              to="/admin/dashboard" // Change the path according to your application
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={closeMenu}
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={closeMenu}
            >
              Profile
            </Link>
          )
        ) : null}
        {user ? (
          <button
            onClick={handelLogOut}
            className="hover:text-brightColor transition-all cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={closeMenu}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={closeMenu}
            >
              Sign Up
            </Link>
          </>
        )}
        <Link
          to="/track"
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          Track Goods
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
