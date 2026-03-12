// import { useQuery } from "@tanstack/react-query";
// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import useAxios from "../../Hooks/useAxios";

// const CategoryPanel = ({ open, toggleDrawer }) => {
//   const axiosPublic = useAxios();
//   const location = useLocation();
//   const [active, setActive] = useState(null);

//   const { data: categories = [], isLoading } = useQuery({
//     queryKey: ["categories-with-subs"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/categories/with-subs");
//       return res.data;
//     },
//   });

//   // 🔥 auto open active category
//   useEffect(() => {
//     categories.forEach((cat) => {
//       const found = cat.subcategories.find(
//         (sub) => location.pathname === `/products/sub/${sub.slug}`,
//       );

//       if (found) {
//         setActive(cat._id);
//       }
//     });
//   }, [location.pathname, categories]);

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
//           open ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//         onClick={toggleDrawer}
//       ></div>

//       {/* Drawer */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-darknav z-50 transform transition-transform duration-300 ${
//           open ? "translate-x-0" : "-translate-x-full"
//         } shadow-lg`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
//           <h2 className="text-lg font-bold dark:text-white">
//             Shop by Categories
//           </h2>
//           <button
//             onClick={toggleDrawer}
//             className="text-gray-700 dark:text-gray-300 font-bold"
//           >
//             ✕
//           </button>
//         </div>

//         <ul className="p-4 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
//           {isLoading
//             ? Array.from({ length: 8 }).map((_, i) => (
//                 <li key={i}>
//                   <Skeleton height={35} />
//                 </li>
//               ))
//             : categories.map((cat) => (
//                 <li key={cat._id}>
//                   {/* Category */}
//                   <button
//                     onClick={() =>
//                       setActive(active === cat._id ? null : cat._id)
//                     }
//                     className="flex justify-between w-full items-center font-medium dark:text-white hover:text-emerald-500 text-sm"
//                   >
//                     {cat.name}
//                   </button>

//                   {/* Subcategories */}
//                   <div
//                     className={`overflow-hidden transition-all ${
//                       active === cat._id ? "max-h-60 mt-2" : "max-h-0"
//                     }`}
//                   >
//                     <ul className="ml-3 border-l pl-3 space-y-1">
//                       {cat.subcategories.map((sub) => {
//                         const isActive =
//                           location.pathname === `/products/sub/${sub.slug}`;

//                         return (
//                           <li key={sub._id}>
//                             <Link
//                               to={`/products/sub/${sub.slug}`}
//                               onClick={toggleDrawer}
//                               className={`block px-2 py-1 rounded text-sm ${
//                                 isActive
//                                   ? "bg-emerald-100 text-emerald-600 font-semibold"
//                                   : "text-gray-600 dark:text-gray-300 hover:text-emerald-500"
//                               }`}
//                             >
//                               {sub.name}
//                             </Link>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </div>
//                 </li>
//               ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default CategoryPanel;





import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxios from "../../Hooks/useAxios";
import { FaChevronDown } from "react-icons/fa";

const CategoryPanel = ({ open, toggleDrawer }) => {
  const axiosPublic = useAxios();
  const location = useLocation();
  const [active, setActive] = useState(null);

  // Fetch categories with subcategories
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories-with-subs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories/with-subs");
      return res.data;
    },
  });

  // Auto open active category based on current path
  useEffect(() => {
    categories.forEach((cat) => {
      const found = cat.subcategories.find(
        (sub) => location.pathname === `/products/sub/${sub.slug}`
      );
      if (found) setActive(cat._id);
    });
  }, [location.pathname, categories]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
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
        <ul className="p-4 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <li key={i}>
                  <Skeleton height={35} />
                </li>
              ))
            : categories.map((cat) => {
                const isCategoryActive =
                  location.pathname === `/products/category/${cat.slug}`;

                return (
                  <li key={cat._id}>
                    {/* Category */}
                    <button
                      onClick={() =>
                        setActive(active === cat._id ? null : cat._id)
                      }
                      className={`flex justify-between w-full items-center font-medium text-sm px-2 py-1 rounded ${
                        isCategoryActive
                          ? "bg-emerald-100 text-emerald-600"
                          : "dark:text-white hover:text-emerald-500"
                      }`}
                    >
                      {cat.name}
                      <FaChevronDown
                        className={`ml-2 transition-transform ${
                          active === cat._id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Subcategories */}
                    <div
                      className={`overflow-hidden transition-all ${
                        active === cat._id ? "max-h-60 mt-2" : "max-h-0"
                      }`}
                    >
                      <ul className="ml-3 border-l pl-3 space-y-1">
                        {cat.subcategories.map((sub) => {
                          const isActive =
                            location.pathname === `/products/sub/${sub.slug}`;

                          return (
                            <li key={sub._id}>
                              <Link
                                to={`/products/sub/${sub.slug}`}
                                onClick={toggleDrawer}
                                className={`block px-2 py-1 rounded text-sm ${
                                  isActive
                                    ? "bg-emerald-100 text-emerald-600 font-semibold"
                                    : "text-gray-600 dark:text-gray-300 hover:text-emerald-500"
                                }`}
                              >
                                {sub.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
        </ul>
      </div>
    </>
  );
};

export default CategoryPanel;