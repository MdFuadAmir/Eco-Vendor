import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Product from "../Product";
import Skeleton from "react-loading-skeleton";
import Pagination from "../../../Components/Pagination/Pagination";

const ProductList = ({ endpoint, queryKey, limit = 20, paginated = false }) => {
  const axiosPublic = useAxios();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: [...queryKey, page],
    queryFn: async () => {
      let url = `${endpoint}`;
      if (paginated) url += `?page=${page}&limit=${limit}`;
      const res = await axiosPublic.get(url);
      return res.data;
    },
    keepPreviousData: true,
  });

  const products = paginated ? data?.products || [] : data || [];
  const totalPages = paginated ? data?.totalPages || 1 : 1;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array(limit)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} height={200} />
          ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((prod) => <Product key={prod._id} prod={prod} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No products found
          </p>
        )}
      </div>
      {paginated && totalPages > 1 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default ProductList;
