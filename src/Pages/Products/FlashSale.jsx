// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../Hooks/useAxios";
// import { FaFire } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import StarRating from "../../Components/StarRating/StarRating";

// const FlashSaleLanding = () => {
//   const axiosPublic = useAxios();

//   const { data: products = [], isLoading } = useQuery({
//     queryKey: ["flash-sale-products"],
//     queryFn: async () => {
//       const { data } = await axiosPublic.get("/products/flash-sale?limit=10");
//       return data;
//     },
//   });

//   return (
//     <section className="py-16 bg-red-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
//             <FaFire /> Flash Sale
//           </h2>
//           <Link
//             to="/flash-sale"
//             className="text-sm font-semibold text-orange-500 hover:underline"
//           >
//             View More
//           </Link>
//         </div>

//         {isLoading ? (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
//             {Array.from({ length: 10 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="border p-4 rounded-lg bg-white dark:bg-gray-800 animate-pulse h-64"
//               >
//                 <div className="w-full h-40 bg-gray-300 rounded mb-2" />
//                 <div className="h-4 bg-gray-300 rounded mb-1 w-3/4" />
//                 <div className="h-4 bg-gray-300 rounded w-1/2" />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 className="border p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition flex  flex-col justify-between"
//               >
//                 <div className="h-40">
//                   <img
//                     src={product.mainImage}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="mt-2 font-semibold dark:text-white">
//                     {product.name}
//                   </h3>
//                   <StarRating rating={product.rating} />
//                   <div className="flex gap-2 mt-2">
//                     <span className="text-red-600 font-bold">
//                       ${product.flashSalePrice}
//                     </span>
//                     {product.price &&
//                       product.price !== product.flashSalePrice && (
//                         <span className="line-through text-gray-400">
//                           ${product.price}
//                         </span>
//                       )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default FlashSaleLanding;

import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";
import StarRating from "../../Components/StarRating/StarRating";

const FlashSaleLanding = () => {
  const axiosPublic = useAxios();

  // Fetch top 10 flash sale products
  const { data, isLoading } = useQuery({
    queryKey: ["flash-sale-products"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/products/flash-sale?limit=10");
      // Ensure we always return an array
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
          <Link
            to="/flash-sale"
            className="text-sm font-semibold btn btn-accent"
          >
            View All
          </Link>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          // Skeleton Loader
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
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
        ) : products.length > 0 ? (
          // Actual Products
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <Link
                to={`/productDetails/${product._id}`}
                key={product._id}
                className="p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition flex flex-col justify-between"
              >
                <div className="h-40">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="mt-2">
                  <h3 className="font-semibold dark:text-white">
                    {product.name}
                  </h3>
                  <StarRating rating={product.rating} />
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
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // No products message
          <p className="text-center py-10 text-gray-500 dark:text-gray-400">
            No Flash Sale Products
          </p>
        )}
      </div>
    </section>
  );
};

export default FlashSaleLanding;
