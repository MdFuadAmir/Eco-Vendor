import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import Product from "../Products/Product";

const MyWishlist = () => {
  const { user } = useAuth();
  const axiosPublic = useAxios();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });

  if (!user)
    return (
      <p className="text-center py-10 dark:text-white">
        Please login to see your wishlist.
      </p>
    );

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">My Wishlist</h1>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} height={200} />
          ))}
        </div>
      ) : wishlist.length === 0 ? (
        <p className="text-center py-10 text-gray-500 dark:text-gray-400">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {wishlist.map((product) => (
            <Product key={product._id} prod={product} isFlashSale={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
