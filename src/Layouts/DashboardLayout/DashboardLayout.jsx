import { Outlet } from "react-router";
import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import Menu from "../../Pages/Dashboard/Common/Menu/Menu";
import ThemeToggle from "../../Components/ThemeToggle/ThemeToggle";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  const closedware = () =>{
    setOpen(false);
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* ========== SIDEBAR ========== */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64
          bg-gray-100 dark:bg-gray-900
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static overflow-scroll
        `}
      >
        <Menu closedware={closedware}/>
      </aside>

      {/* ========== OVERLAY (mobile only) ========== */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        ></div>
      )}

      {/* ========== RIGHT SIDE ========== */}
      <div className="flex-1 flex flex-col">
        {/* ========== NAVBAR ========== */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-gray-100 dark:bg-gray-900 shadow z-20 flex items-center justify-between px-4 lg:ml-64">
          <div className="flex items-center gap-3">
            {/* Menu icon (only mobile) */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-gray-800 dark:text-white"
            >
              {open ? <BiX size={26} /> : <BiMenu size={26} />}
            </button>

            <h1 className="font-bold text-emerald-500">HELLO...</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm dark:text-gray-300">md fuad amir</span>
          </div>
        </header>

        {/* ========== MAIN CONTENT ========== */}
        <main className="flex-1 pt-16 dark:bg-neutral-900 overflow-y-auto bg-gray-200">
          <Outlet />
        </main>
        {/* ========== THEME BUTTON ========== */}
        <div className="fixed bottom-12 right-6 z-50">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
