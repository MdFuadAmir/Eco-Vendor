import { Link } from "react-router";
import Navbar from "../Navbar/Navbar";
import { MdRocketLaunch } from "react-icons/md";
import Search from "../Search/Search";
import { useEffect, useState } from "react";
import Logo from "../../Utils/Logo/Logo";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline, IoHomeOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
const Header = () => {
  const [fixedHeader, setFixedHeader] = useState(false);
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
      {/* <div className="py-2 hidden md:block bg-emerald-400/20">
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
      </div> */}
      {/*  */}
      <div
        className={`bg-lightnav dark:bg-darknav w-full z-50 transition-all duration-300 ${fixedHeader ? "fixed top-0 left-0 shadow-md" : "relative"}`}
      >
        <div className="text-sm py-3 flex items-center justify-between dark:text-white  container gap-6">
          <div
            className={`${fixedHeader ? "flex" : "hidden"} md:flex hidden items-center w-fit `}
          >
            <Logo />
          </div>
          <div className="w-full md:w-[45%] ">
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
          <div className="hidden lg:flex items-center gap-4 ">
            <Tooltip title="Wishlist">
              <Link
                to={"/wishlist"}
                className="hover:text-emerald-400 dark:text-white cursor-pointer"
              >
                <CiHeart size={25} />
              </Link>
            </Tooltip>
            <Tooltip title="Cart">
              <Link
                to={"/cart"}
                className="hover:text-emerald-400 dark:text-white cursor-pointer"
              >
                <IoCartOutline size={25} />
              </Link>
            </Tooltip>
            <Tooltip title={"Account"}>
              <Link to={"/dashboard"} className="hidden lg:block">
                <MdOutlineManageAccounts size={25} />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
      {fixedHeader && <div className="h-16" />}
      {/* Desktop Navbar */}
      <div className="hidden lg:block ">
        <Navbar />
      </div>

      {/* Bottom Navbar - Mobile only */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full border-t border-gray-300 dark:border-gray-700 flex justify-around items-center py-2 z-50 bg-lightnav dark:bg-darknav">
        <Link
          to="/"
          onClick={handleScrollTop}
          className="flex flex-col items-center  dark:text-white hover:text-emerald-400"
        >
          <IoHomeOutline size={24} />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          to={"/wishlist"}
          className="flex flex-col items-center dark:text-white hover:text-emerald-400"
        >
          <CiHeart size={24} />
          <span className="text-xs">Wishlist</span>
        </Link>
        <Link
          to={"/cart"}
          className="flex flex-col items-center  dark:text-white hover:text-emerald-400"
        >
          <IoCartOutline size={24} />
          <span className="text-xs">Cart</span>
        </Link>
        <Link
          to={"/dashboard"}
          className="flex flex-col items-center dark:text-white hover:text-emerald-400"
        >
          <MdOutlineManageAccounts size={24} />
          <span className="text-xs">Account</span>
        </Link>
      </div>
    </header>
  );
};
export default Header;
