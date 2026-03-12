import { NavLink } from "react-router";
import { MdRocketLaunch } from "react-icons/md";

const navLinks = (
  <>
    <li>
      <NavLink to="/" className="hover:text-emerald-500 hover:border-b-2">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/products"
        className="hover:text-emerald-500 hover:border-b-2"
      >
        Products
      </NavLink>
    </li>

    <li>
      <NavLink to="/store" className="hover:text-emerald-500 hover:border-b-2">
        Store
      </NavLink>
    </li>
    <li>
      <NavLink to="/about" className="hover:text-emerald-500 hover:border-b-2">
        About
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/contact"
        className="hover:text-emerald-500 hover:border-b-2"
      >
        Contact
      </NavLink>
    </li>
  </>
);

const Navbar = () => {
  return (
    <div className="bg-lightnav dark:bg-darknav">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-1">
          {/* All Categories Button */}
          <div className="w-[25%]"></div>
          {/* Nav links */}
          <ul className="hidden lg:flex justify-center  gap-6 items-center dark:text-white">
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
    </div>
  );
};

export default Navbar;
