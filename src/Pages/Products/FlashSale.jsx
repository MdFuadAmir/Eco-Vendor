import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";
import Product from "./Product";

const FlashSaleLanding = () => {
  const axiosPublic = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["flash-sale-products"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/products/flash-sale?limit=10");
      return Array.isArray(data) ? data : data.products || [];
    },
  });

  const products = data || [];

  return (
    <section className="py-16 bg-red-50 dark:bg-gray-900">
      <div className="container">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
            <FaFire /> Flash Sale
          </h2>

          <Link to="/flash-sale" className="btn btn-accent text-sm">
            View All
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Product key={i} loading />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <Product key={product._id} prod={product} isFlashSale={true} />
            ))}
          </div>
        ) : (
          <p className="text-center py-10 text-gray-500 dark:text-gray-400">
            No Flash Sale Products
          </p>
        )}
      </div>
    </section>
  );
};

export default FlashSaleLanding;
