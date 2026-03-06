import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxios from "../../Hooks/useAxios";

const CategoryPanel = ({ open, toggleDrawer }) => {
  const axiosPublic = useAxios();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["allcategories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories/active");
      return res.data;
    },
  });

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 bg-opacity-50 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleDrawer}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-darknav z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } shadow-lg`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-bold dark:text-white">
            Shop by Categories
          </h2>
          <button
            onClick={toggleDrawer}
            className="text-gray-700 dark:text-gray-300 font-bold"
          >
            ✕
          </button>
        </div>
        {/* Category List */}
        <ul className="p-4 space-y-2 overflow-y-auto h-[calc(100%-60px)]">
          {isLoading
            ? // 🔹 Skeleton Loader
              Array.from({ length: 8 }).map((_, i) => (
                <li key={i}>
                  <Skeleton height={35} />
                </li>
              ))
            : categories.map((cat) => (
                <li key={cat._id}>
                  <Link
                    to={`/${cat.slug}`}
                    onClick={toggleDrawer}
                    className="block px-4 py-2 rounded hover:bg-emerald-100  dark:hover:bg-gray-700 cursor-pointer dark:text-white"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};

export default CategoryPanel;
