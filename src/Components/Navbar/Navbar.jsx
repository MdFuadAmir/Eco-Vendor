import { NavLink } from "react-router";
import Logo from "../../Utils/Logo/Logo";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoIosGitCompare } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/"}>Shop</NavLink>
      </li>
      <li className=" relative group">
        <NavLink to={"/"} className="cursor-pointer">
          Categories
        </NavLink>
        {/* Dropdown */}
        <ul className="absolute left-0 top-full w-40 bg-white dark:bg-gray-900 shadow-lg rounded-md hidden  group-hover:block z-50">
          <NavLink>
            <li className="px-4 py-2 hover:bg-emerald-100 dark:hover:bg-gray-700 cursor-pointer">
              Electronics
            </li>
          </NavLink>
          <NavLink>
            <li className="px-4 py-2 hover:bg-emerald-100 dark:hover:bg-gray-700 cursor-pointer">
              Fashion
            </li>
          </NavLink>
          <NavLink>
            <li className="px-4 py-2 hover:bg-emerald-100 dark:hover:bg-gray-700 cursor-pointer">
              Grocery
            </li>
          </NavLink>
          <NavLink>
            <li className="px-4 py-2 hover:bg-emerald-100 dark:hover:bg-gray-700 cursor-pointer">
              Books
            </li>
          </NavLink>
        </ul>
      </li>
      <li>
        <NavLink to={"/"}>About</NavLink>
      </li>
      <li>
        <NavLink to={"/"}>Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="border-t border-gray-500 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4">
          <div className="">
            <button className="dark:text-white flex w-full justify-between items-center gap-4 px-4 py-2 rounded-lg bg-green-500/20">
              All Categories <MdOutlineKeyboardArrowDown />
            </button>
          </div>
          {/* Nav links - lg only */}
          <ul className="hidden lg:flex gap-6 items-center dark:text-white">
            {navLinks}
          </ul>

          {/* Icons + Auth - right side */}
          <div className="flex items-center gap-4">
            {/* sm: only icons */}
            <div className="flex md:hidden items-center gap-3 lg:hidden">
              <Tooltip title="Compare">
                <div className="hover:text-emerald-400 dark:text-white cursor-pointer">
                  <IoIosGitCompare size={25} />
                </div>
              </Tooltip>
              <Tooltip title="Wishlist">
                <div className="hover:text-emerald-400 dark:text-white cursor-pointer">
                  <CiHeart size={25} />
                </div>
              </Tooltip>
              <Tooltip title="Cart">
                <div className="hover:text-emerald-400 dark:text-white cursor-pointer">
                  <IoCartOutline size={25} />
                </div>
              </Tooltip>
            </div>

            {/* lg: login + icons */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex gap-2">
                <button className="dark:text-white hover:text-emerald-400">
                  Login
                </button>
                <span className="dark:text-white">|</span>
                <button className="dark:text-white hover:text-emerald-400">
                  Register
                </button>
              </div>

              <div className="flex items-center gap-4">
                <Tooltip title="Compare">
                  <div className="hover:text-emerald-400 dark:text-white cursor-pointer">
                    <IoIosGitCompare size={25} />
                  </div>
                </Tooltip>
                <Tooltip title="Wishlist">
                  <div className="hover:text-emerald-400 dark:text-white cursor-pointer">
                    <CiHeart size={25} />
                  </div>
                </Tooltip>
                <Tooltip title="Cart">
                  <div className="hover:text-emerald-400 dark:text-white cursor-pointer">
                    <IoCartOutline size={25} />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
