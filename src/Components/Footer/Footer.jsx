import { FaRegCopyright } from "react-icons/fa";
import Logo from "../../Utils/Logo/Logo";
const Footer = () => {
  return (
    <footer className="bg-slate-200/50 dark:bg-slate-800/50 pt-12">
      <div className="px-4 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4 flex flex-col col-span-1">
          <Logo />
          <div className="space-y-2">
            <p className="font-medium dark:text-slate-300">
              Modern E-commerce solution
            </p>
            <p className="w-full md:max-w-xs text-xs dark:text-slate-400">
              Eco-Vendex brings all your favorite vendors under one roof, making
              shopping fast, easy, and eco-friendly. Discover, shop, and grow
              your business with us.
            </p>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h3 className="font-semibold mb-3 dark:text-slate-500">
              Quick Links
            </h3>
            <ul className="space-y-2 text-slate-500 dark:text-slate-300">
              <li className="hover:text-primary cursor-pointer">Home</li>
              <li className="hover:text-primary cursor-pointer">Shop</li>
              <li className="hover:text-primary cursor-pointer">Vendors</li>
              <li className="hover:text-primary cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 dark:text-slate-500">
              Quick Links
            </h3>
            <ul className="space-y-2 text-slate-500 dark:text-slate-300">
              <li className="hover:text-primary cursor-pointer">Home</li>
              <li className="hover:text-primary cursor-pointer">Shop</li>
              <li className="hover:text-primary cursor-pointer">Vendors</li>
              <li className="hover:text-primary cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 dark:text-slate-500">
              Quick Links
            </h3>
            <ul className="space-y-2 text-slate-500 dark:text-slate-300">
              <li className="hover:text-primary cursor-pointer">Home</li>
              <li className="hover:text-primary cursor-pointer">Shop</li>
              <li className="hover:text-primary cursor-pointer">Vendors</li>
              <li className="hover:text-primary cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 dark:text-slate-500">
              Social Links
            </h3>
            <ul className="space-y-2 text-slate-500 dark:text-slate-300">
              <li className="hover:text-primary cursor-pointer">Home</li>
              <li className="hover:text-primary cursor-pointer">Shop</li>
              <li className="hover:text-primary cursor-pointer">Vendors</li>
              <li className="hover:text-primary cursor-pointer">Contact</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center text-sm gap-2 mt-10 py-4 justify-center font-semibold border-t border-slate-400 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-4">
        <FaRegCopyright /> 2026 Eco-Vendex. All rights reserved by Md Fuad Amir
      </div>
    </footer>
  );
};

export default Footer;
