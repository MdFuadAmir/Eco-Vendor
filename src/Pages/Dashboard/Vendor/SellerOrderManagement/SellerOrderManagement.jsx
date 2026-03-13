import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import toast from "react-hot-toast";
import useMongoUser from "../../../../Hooks/useMongoUser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const statusBadge = {
  pending: "badge-warning",
  accepted: "badge-info",
  packed: "badge-primary",
  shipped: "badge-secondary",
  completed: "badge-success",
  cancelled: "badge-error",
};

const nextStatus = {
  pending: "accepted",
  accepted: "packed",
  packed: "shipped",
  shipped: "completed",
};

const SellerOrderManagement = () => {
  const { mongoUser, mongoUserLoading } = useMongoUser();
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  // Fetch seller orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["seller-orders", mongoUser?._id],
    enabled: !!mongoUser?._id && !mongoUserLoading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/seller-orders?sellerId=${mongoUser._id}`,
      );
      return data;
    },
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }) => {
      return axiosSecure.patch(`/seller-orders/${orderId}/status`, { status });
    },
    onSuccess: () => {
      toast.success("Order status updated");
      queryClient.invalidateQueries(["seller-orders", mongoUser._id]);
    },
    onError: () => {
      toast.error("Failed to update order");
    },
  });

  // Next status
  const handleNextStatus = (order) => {
    const status = nextStatus[order.orderStatus];
    if (!status) return;

    updateStatusMutation.mutate({
      orderId: order._id,
      status,
    });
  };

  // Cancel order
  const handleCancel = (order) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) return;

    updateStatusMutation.mutate({
      orderId: order._id,
      status: "cancelled",
    });
  };

  // Print invoice
  const handlePrint = (orderId) => {
    window.open(`/invoice/${orderId}`, "_blank");
  };

  // Loading skeleton
  if (isLoading || mongoUserLoading) {
    return (
      <div className="p-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} height={40} className="mb-2" />
        ))}
      </div>
    );
  }

  // Filter out cancelled and completed orders
  const activeOrders = orders.filter(
    (o) => o.orderStatus !== "cancelled" && o.orderStatus !== "completed",
  );

  if (activeOrders.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No active orders found
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📦 Seller Order Management</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Invoice</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {activeOrders.map((o) => (
              <tr key={o._id}>
                <td className="font-semibold">{o.orderId}</td>
                <td>{o.userEmail}</td>
                <td>
                  <span className={`badge ${statusBadge[o.orderStatus]}`}>
                    {o.orderStatus}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handlePrint(o._id)}
                    className="btn btn-xs btn-outline"
                  >
                    Print
                  </button>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleNextStatus(o)}
                    className="btn btn-xs btn-success"
                  >
                    Mark {nextStatus[o.orderStatus]}
                  </button>
                  <button
                    onClick={() => handleCancel(o)}
                    className="btn btn-xs btn-error"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrderManagement;
