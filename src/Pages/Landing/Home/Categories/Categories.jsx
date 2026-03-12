import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxios from "../../../../Hooks/useAxios";
import Tilt from "react-parallax-tilt";

const Categories = () => {
  const axiosPublic = useAxios();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["landingCategories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories/active");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container py-12 grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <Skeleton height={60} />
            <Skeleton height={15} className="mt-2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container">
      <div
        className="grid grid-rows-2 grid-flow-col 
          auto-cols-[150px]
          
          overflow-x-auto
          scroll-smooth
          snap-x snap-mandatory no-scrollbar
          py-12"
      >
        {categories.map((cat, index) => {
          const isFirstRow = index % 2 === 0;
          return (
            <Tilt
              key={cat._id}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              className={`bg-white dark:bg-darknav/50 dark-card p-4 text-center transition
      text-lighttitle dark:text-darktitle
      border-gray-200 dark:border-gray-700
      
      ${isFirstRow ? "border-b border-r" : "border-r"}
      `}
            >
              <Link to={`/products/category/${cat.slug}`}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-14 w-fit object-contain mx-auto"
                />

                <p className="mt-2 text-xs font-medium dark:text-white">
                  {cat.name}
                </p>
              </Link>
            </Tilt>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
