import { FaTruckFast } from "react-icons/fa6";
const FreeShiping = () => {
  return (
    <div className="py-12">
      <div className="bg-lightnav dark:bg-darknav/80 max-w-4xl mx-auto flex justify-between items-center px-4 md:px-6 py-8 rounded-lg">
        <div className="text-xl flex items-center gap-3 dark:text-white">
          <FaTruckFast />
          <p className="uppercase">Free delivery</p>
        </div>
        <div className="text-xl hidden md:flex dark:text-white">
          Free delivery on your first order and over
          <span className="text-emerald-600 ml-2">$50</span>
        </div>
        <div>
          <p className="text-xl font-bold dark:text-white">-Only $50</p>
        </div>
      </div>
    </div>
  );
};

export default FreeShiping;
