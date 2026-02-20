import { NavLink } from "react-router";
import { MdOutlineKeyboardArrowDown, MdRocketLaunch } from "react-icons/md";
import { useState } from "react";
import CategoryPanel from "./CategoryPanel";

const navLinks = (
  <>
    <li>
      <NavLink to="/" className="hover:text-emerald-500 hover:border-b-2">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/" className="hover:text-emerald-500 hover:border-b-2">
        Shop
      </NavLink>
    </li>
    <li>
      <NavLink to="/" className="hover:text-emerald-500 hover:border-b-2">
        About
      </NavLink>
    </li>
    <li>
      <NavLink to="/" className="hover:text-emerald-500 hover:border-b-2">
        Contact
      </NavLink>
    </li>
  </>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="border-t border-gray-500 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4">
          {/* All Categories Button */}
          <button
            onClick={toggleDrawer}
            className="dark:text-white hover:text-emerald-400 flex items-center gap-2 px-4 py-2 rounded-lg font-bold w-[25%]"
          >
            All Categories <MdOutlineKeyboardArrowDown />
          </button>

          {/* Nav links */}
          <ul className="hidden lg:flex justify-center gap-6 items-center dark:text-white">
            {navLinks}
          </ul>

          {/* Icons */}
          <div className="flex items-center justify-end w-[30%]  gap-4">
            <div className="flex justify-center gap-2 dark:text-white">
              <span className="animate-bounce text-lg text-green-400">
                <MdRocketLaunch />
              </span>
              Free Home Delevery
            </div>
          </div>
        </div>
      </div>

      {/* ===== Drawer ===== */}
      <CategoryPanel toggleDrawer={toggleDrawer} open={open} />
    </div>
  );
};

export default Navbar;
