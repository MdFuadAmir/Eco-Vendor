import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import banner from "../../assets/banners/flashsale.jpg"
import Product from "./Product";
import Pagination from "../../Components/Pagination/Pagination";



const FlashSalePage = () => {
  const axiosPublic = useAxios();
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading } = useQuery({
    queryKey: ["flash-sale-all", page],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/products/flash-sale?page=${page}&limit=${limit}`
      );
      return data;
    },
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  return (
    <section className="pb-12 bg-red-50 dark:bg-gray-900">
      <div className="container mx-auto">

        {/* Banner */}
        <div className="w-full h-56 rounded-xl mb-8">
          <img
            src={banner}
            alt="Flash Sale Banner"
            className="w-full h-full rounded-xl object-cover"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: limit }).map((_, i) => (
              <Product key={i} loading />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center py-10 text-gray-500">
            No Flash Sale Products
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map((product) => (
                <Product
                  key={product._id}
                  prod={product}
                  isFlashSale={true}
                />
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