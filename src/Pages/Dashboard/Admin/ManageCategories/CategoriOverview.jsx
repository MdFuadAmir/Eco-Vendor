import { AiOutlineDashboard } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxios from "../../../../Hooks/useAxios";

const CategoryOverview = () => {
  const axiosPublic = useAxios();

  // Fetch categories
  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories");
      return res.data;
    },
  });

  // Fetch subcategories
  const { data: subcategories = [], isLoading: loadingSubcategories } =
    useQuery({
      queryKey: ["subcategories"],
      queryFn: async () => {
        const res = await axiosPublic.get("/subcategories");
        return res.data;
      },
    });

  // Fetch brands
  const { data: brands = [], isLoading: loadingBrands } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await axiosPublic.get("/brands");
      return res.data;
    },
  });

  // Fetch attributes
  const { data: attributes = [], isLoading: loadingAttributes } = useQuery({
    queryKey: ["attributes"],
    queryFn: async () => {
      const res = await axiosPublic.get("/attributes");
      return res.data;
    },
  });

  const stats = [
    { title: "Categories", data: categories, loading: loadingCategories },
    {
      title: "Subcategories",
      data: subcategories,
      loading: loadingSubcategories,
    },
    { title: "Brands", data: brands, loading: loadingBrands },
    { title: "Attributes", data: attributes, loading: loadingAttributes },
  ];

  return (
    <div className="p-4 bg-base-100 dark:bg-darknav/80 rounded-xl shadow">
      <h1 className="mb-3 text-xl font-bold dark:text-white flex items-center gap-2">
        <AiOutlineDashboard /> Overview
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-200">
        Total categories, subcategories, brands, and attributes
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {stats.map((item) => (
          <Cards
            key={item.title}
            title={item.title}
            number={item.data?.length || 0}
            loading={item.loading}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryOverview;

// ✅ Custom Card component
const Cards = ({ title, number, loading }) => {
  return (
    <div className="stat bg-base-200 dark:bg-gray-800 rounded-lg p-4">
      <div className="stat-title dark:text-gray-400">{title}</div>
      <div className="stat-value dark:text-gray-200">
        {loading ? <Skeleton width={50} /> : number}
      </div>
    </div>
  );
};
