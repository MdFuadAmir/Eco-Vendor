import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import useAuth from "../../../../Hooks/useAuth";
import useAxios from "../../../../Hooks/useAxios";

const ToReview = () => {
  const { user } = useAuth();
  const axiosPublic = useAxios();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders-review", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/my-orders/${user.email}/review`);
      return data;
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async (orderId) =>
      axiosPublic.patch(`/my-orders/${orderId}/review`),

    onSuccess: () => {
      toast.success("Marked as reviewed");
      queryClient.invalidateQueries(["my-orders-review", user?.email]);
    },
  });

  // ✅ Skeleton Loader
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border p-4 rounded-lg bg-white shadow">
            <Skeleton height={20} width={150} />
            <Skeleton height={15} width={200} className="mt-2" />
            <Skeleton height={15} width={120} className="mt-2" />

            <div className="mt-3 space-y-1">
              <Skeleton height={15} />
              <Skeleton height={15} />
            </div>

            <Skeleton height={30} width={140} className="mt-4" />
          </div>
        ))}
      </div>
    );
  }

  if (!orders.length) return <p>No orders to review</p>;

  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <div key={o._id} className="border p-4 rounded-lg bg-white shadow">
          <p className="font-bold">{o.shopName}</p>

          <p className="text-sm text-gray-500">Order ID: {o.orderId}</p>

          <p className="font-semibold mt-1">Total: ${o.total}</p>

          <div className="mt-3 space-y-1">
            {o.products.map((p) => (
              <p key={p._id} className="text-sm">
                {p.name} × {p.quantity}
              </p>
            ))}
          </div>

          <button
            onClick={() => reviewMutation.mutate(o._id)}
            className="mt-3 px-3 py-1 text-sm bg-emerald-500 text-white rounded"
          >
            Mark as Reviewed
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToReview;
