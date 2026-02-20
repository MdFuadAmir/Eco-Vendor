const CategoryPanel = ({ open, toggleDrawer }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleDrawer}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } shadow-lg`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-bold dark:text-white">
            Shop by Categories
          </h2>
          <button
            onClick={toggleDrawer}
            className="text-gray-700 dark:text-gray-300 font-bold"
          >
            X
          </button>
        </div>

        <ul className="p-4 space-y-2">
          <li
            className="px-4 py-2 rounded hover:bg-emerald-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={toggleDrawer}
          >
            Electronics
          </li>
          <li
            className="px-4 py-2 rounded hover:bg-emerald-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={toggleDrawer}
          >
            Fashion
          </li>
          <li
            className="px-4 py-2 rounded hover:bg-emerald-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={toggleDrawer}
          >
            Grocery
          </li>
          <li
            className="px-4 py-2 rounded hover:bg-emerald-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={toggleDrawer}
          >
            Books
          </li>
        </ul>
      </div>
    </>
  );
};

export default CategoryPanel;
