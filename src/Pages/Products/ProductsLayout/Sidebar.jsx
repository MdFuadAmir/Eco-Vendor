import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";

const Sidebar = () => {
  const axiosPublic = useAxios();
  const location = useLocation();
  const [open, setOpen] = useState(null);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories-with-subs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories/with-subs");
      return res.data;
    },
  });

  useEffect(() => {
    categories.forEach((cat) => {
      const found = cat.subcategories.find(
        (sub) => location.pathname === `/products/sub/${sub.slug}`
      );

      if (found) {
        setOpen(cat._id);
      }
    });
  }, [location.pathname, categories]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow">
      <h2 className="font-bold mb-4 dark:text-white">Categories</h2>

      <ul className="space-y-4">
        <li>
          <Link
            to="/products"
            className={`block px-2 py-1 rounded ${
              location.pathname === "/products"
                ? "bg-emerald-100 text-emerald-600 font-semibold"
                : "dark:text-white"
            }`}
          >
            All Products
          </Link>
        </li>

        {categories.map((cat) => {
          const isCategoryActive =
            location.pathname === `/products/category/${cat.slug}`;

          return (
            <li key={cat._id}>
              <Link
                to={`/products/category/${cat.slug}`}
                onClick={() => setOpen(open === cat._id ? null : cat._id)}
                className={`flex justify-between w-full items-center font-medium text-sm px-2 py-1 rounded ${
                  isCategoryActive
                    ? "bg-emerald-100 text-emerald-600"
                    : "dark:text-white hover:text-emerald-500"
                }`}
              >
                {cat.name}
              </Link>

              <div
                className={`overflow-hidden transition-all ${
                  open === cat._id ? "max-h-60 mt-2" : "max-h-0"
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
  );
};

export default Sidebar;