import { FaRegCopyright } from "react-icons/fa";
import Logo from "../../Utils/Logo/Logo";
const Footer = () => {
  return (
    <footer className="bg-lightfooter dark:bg-darkfooter pt-12">
      <div className="px-4 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4 flex flex-col col-span-1">
          <Logo />
          <div className="space-y-2">
            <p className="font-medium dark:text-white">
              Modern E-commerce solution
            </p>
            <p className="w-full md:max-w-xs text-xs text-lightsubtitle dark:text-gray-400">
              Eco-Vendex brings all your favorite vendors under one roof, making
              shopping fast, easy, and eco-friendly. Discover, shop, and grow
              your business with us.
            </p>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h3 className="font-semibold mb-3 dark:text-white" >
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-400">
              <li className="hover:text-indigo-500 cursor-pointer">Home</li>
              <li className="hover:text-indigo-500 cursor-pointer">Shop</li>
              <li className="hover:text-indigo-500 cursor-pointer">Vendors</li>
              <li className="hover:text-indigo-500 cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-400">
              <li className="hover:text-indigo-500 cursor-pointer">Home</li>
              <li className="hover:text-indigo-500 cursor-pointer">Shop</li>
              <li className="hover:text-indigo-500 cursor-pointer">Vendors</li>
              <li className="hover:text-indigo-500 cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-400">
              <li className="hover:text-indigo-500 cursor-pointer">Home</li>
              <li className="hover:text-indigo-500 cursor-pointer">Shop</li>
              <li className="hover:text-indigo-500 cursor-pointer">Vendors</li>
              <li className="hover:text-indigo-500 cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 dark:text-white">
              Social Links
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-400">
              <li className="hover:text-indigo-500 cursor-pointer">Home</li>
              <li className="hover:text-indigo-500 cursor-pointer">Shop</li>
              <li className="hover:text-indigo-500 cursor-pointer">Vendors</li>
              <li className="hover:text-indigo-500 cursor-pointer">Contact</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center text-sm gap-2 mt-10 py-4 justify-center font-semibold border-t border-slate-400 dark:border-slate-300 text-slate-600 dark:text-slate-300 px-4">
        <FaRegCopyright /> 2026 Eco-Vendex. All rights reserved by Md Fuad Amir
      </div>
    </footer>
  );
};

export default Footer;
