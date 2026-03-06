import { useQuery } from "@tanstack/react-query";
import Product from "./Product";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router";

const TopSell = () => {
  const axiosPublic = useAxios();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["topRatedProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products/top-rated");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container py-12">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          Top Rated Products
        </h1>
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4 dark:text-white">
          Top Rating
        </h1>
        <Link to="/top-rated" className="btn btn-accent">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((prod) => (
          <Product key={prod._id} prod={prod} />
        ))}
      </div>
    </div>
  );
};

export default TopSell;
