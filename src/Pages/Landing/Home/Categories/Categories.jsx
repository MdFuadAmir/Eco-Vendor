import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxios from "../../../../Hooks/useAxios";

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
      <div className="container py-12 grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="p-4 bg-white rounded shadow">
            <Skeleton height={60} />
            <Skeleton height={15} className="mt-2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div
        className="grid grid-rows-2 grid-flow-col 
          auto-cols-[150px]
          gap-4
          overflow-x-auto
          scroll-smooth
          snap-x snap-mandatory no-scrollbar
          py-2"
      >
        {categories.map((cat) => (
          <Link
            key={cat._id}
            to={`/${cat.slug}`}
            className="rounded bg-lightnav dark:bg-darknav/80 dark-card p-2 text-center shadow hover:shadow-lg transition text-lighttitle dark:text-darktitle"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-14 w-full object-contain mx-auto"
            />
            <p className="mt-2 text-sm font-medium dark:text-white">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
