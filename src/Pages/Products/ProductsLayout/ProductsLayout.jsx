import { Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "./Sidebar";


const ProductsLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="container relative py-12">
      <div className="grid lg:grid-cols-8 gap-6 ">

        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-2">
          <Sidebar/>
        </div>

        {/* Products */}
        <div className="col-span-8 lg:col-span-6">
          <Outlet context={{ setOpen }} />
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 transition ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* drawer */}
        <div
          className={`overflow-y-scroll absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl transform transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar/>
        </div>
      </div>
    </div>
  );
};

export default ProductsLayout;