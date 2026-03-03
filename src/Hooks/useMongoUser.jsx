import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useMongoUser = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxios();

  const {
    data: mongoUser,
    isLoading:mongoUserLoading,
    refetch,
  } = useQuery({
    queryKey: ["mongoUser", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/me-email?email=${user.email}`);
      return res.data;
    },
  });

  return { mongoUser, mongoUserLoading, refetch };
};

export default useMongoUser;
