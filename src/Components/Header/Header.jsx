import { Link } from "react-router";
import Navbar from "../Navbar/Navbar";
import { MdRocketLaunch } from "react-icons/md";
import Search from "../Search/Search";
import { useEffect, useState } from "react";
import Logo from "../../Utils/Logo/Logo";
import { IoIosGitCompare } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
const Header = () => {
  const [fixedHeader, setFixedHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setFixedHeader(true);
      } else {
        setFixedHeader(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className="relative z-50">
      {/* Top Strip - Desktop only */}
      <div className="py-2 border-y border-emerald-400 hidden md:block bg-emerald-400/20">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="col-span-1 w-[50%]">
              <p className="dark:text-white">
                Get up 50% off new season styles, limited time only
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link className=" dark:text-white hover:text-emerald-400">
                Help Center
              </Link>
              <p className="py-3 border  dark:text-white"></p>
              <Link className=" dark:text-white hover:text-emerald-400">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div
        className={`w-full bg-white dark:bg-gray-900 z-50 transition-all duration-300 ${fixedHeader ? "fixed top-0 left-0 shadow-md" : "relative"}`}
      >
        <div className="text-sm py-3 flex items-center justify-between dark:text-white  container gap-6">
          <div
            className={`${fixedHeader ? "flex" : "hidden"} md:flex hidden items-center w-[25%]`}
          >
            <Logo />
          </div>
          <div className="w-full md:w-[40%]">
            <Search />
          </div>
          <div className="hidden md:flex lg:hidden items-center justify-end w-[30%]  gap-4">
            <div className="flex justify-center gap-2 dark:text-white">
              <span className="animate-bounce text-lg text-green-400">
                <MdRocketLaunch />
              </span>
              Free Home Delevery
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
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
            <Tooltip title={"Account"}>
              <div className="hidden lg:block">
                <MdOutlineManageAccounts size={25} />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      {fixedHeader && <div className="h-16" />}
      {/* Desktop Navbar */}
      <div className="hidden lg:block border-b border-gray-500">
        <Navbar />
      </div>

      {/* Bottom Navbar - Mobile only */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 flex justify-around items-center py-2 z-50">
        <Link className="flex flex-col items-center text-gray-700 dark:text-white hover:text-emerald-400">
          <IoIosGitCompare size={24} />
          <span className="text-xs">Compare</span>
        </Link>
        <Link className="flex flex-col items-center text-gray-700 dark:text-white hover:text-emerald-400">
          <CiHeart size={24} />
          <span className="text-xs">Wishlist</span>
        </Link>
        <Link className="flex flex-col items-center text-gray-700 dark:text-white hover:text-emerald-400">
          <IoCartOutline size={24} />
          <span className="text-xs">Cart</span>
        </Link>
        <Link className="flex flex-col items-center text-gray-700 dark:text-white hover:text-emerald-400">
          <MdOutlineManageAccounts size={24} />
          <span className="text-xs">Account</span>
        </Link>
      </div>
    </header>
  );
};
export default Header;
