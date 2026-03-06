import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Product from "./Product";

const TopRatedPage = () => {
  const axiosPublic = useAxios();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["topRatedAll"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products/top-rated/all");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="container">
        {/* 🔥 Banner Section */}
      <div className="mb-8 rounded-xl overflow-hidden bg-linear-to-r from-amber-300 via-orange-500 to-red-600">
        <div className="px-6 py-10 md:py-14 text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold">
            ⭐ Top Rated Products
          </h1>
          <p className="mt-2 text-sm md:text-base opacity-90">
            Discover the best products loved by our customers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((prod) => (
          <Product key={prod._id} prod={prod} />
        ))}
      </div>
    </div>
  );
};

export default TopRatedPage;