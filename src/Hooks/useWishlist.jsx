// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxios from "./useAxios";

// const useWishlist = () => {
//   const { user } = useAuth();
//   const axiosPublic = useAxios();

//   const { data: wishlist = [], refetch } = useQuery({
//     queryKey: ["wishlist", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosPublic.get(`/wishlist?email=${user.email}`);
//       return res.data;
//     },
//   });

//   return { wishlist, refetch };
// };

// export default useWishlist;
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useWishlist = () => {
  const { user } = useAuth();
  const axiosPublic = useAxios();

  const {
    data: wishlist = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });

  return { wishlist, refetch, isLoading };
};

export default useWishlist;