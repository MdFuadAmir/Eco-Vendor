import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !authLoading && !!user.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });
  return { role: data?.role, roleLoading };
};

export default useRole;
