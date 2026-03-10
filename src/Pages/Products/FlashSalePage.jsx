import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Pagination from "../../Components/Pagination/Pagination";
import banner from "../../assets/banners/flashsale.jpg";
import { Link } from "react-router";

const FlashSalePage = () => {
  const axiosPublic = useAxios();
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading } = useQuery({
    queryKey: ["flash-sale-all", page],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/products/flash-sale?page=${page}&limit=${limit}`,
      );
      return data;
    },
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  return (
    <section className="pb-12 bg-red-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="w-full h-56 rounded-xl mb-8">
          <img
            src={banner}
            alt="/banner"
            className="w-full h-full rounded-xl"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: limit }).map((_, i) => (
              <div
                key={i}
                className="border p-4 rounded-lg bg-white dark:bg-gray-800 animate-pulse h-64"
              >
                <div className="w-full h-40 bg-gray-300 rounded mb-2" />
                <div className="h-4 bg-gray-300 rounded mb-1 w-3/4" />
                <div className="h-4 bg-gray-300 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center py-10 text-white">No Flash Sale Products</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map((product) => (
                <Link to={`/productDetails/${product._id}`}
                  key={product._id}
                  className=" p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition"
                >
                  <img
                    src={product.mainImage}
                    className="w-full h-40 object-contain"
                  />
                  <h3 className="mt-2 font-semibold dark:text-white">
                    {product.name}
                  </h3>
                  <div className="flex gap-2 mt-2">
                    <span className="text-red-600 font-bold">
                      ${product.flashSalePrice}
                    </span>
                    {product.price &&
                      product.price !== product.flashSalePrice && (
                        <span className="line-through text-gray-400">
                          ${product.price}
                        </span>
                      )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FlashSalePage;
