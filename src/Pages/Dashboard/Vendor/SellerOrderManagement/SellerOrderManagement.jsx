import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import useMongoUser from "../../../../Hooks/useMongoUser";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

const statusBadge = {
  pending: "badge-warning",
  accepted: "badge-info",
  packed: "badge-primary",
  shipped: "badge-secondary",
};

const nextStatus = {
  pending: "accepted",
  accepted: "packed",
  packed: "shipped",
  shipped: "completed",
};

const SellerOrderManagement = () => {
  const { mongoUser, mongoUserLoading } = useMongoUser();
  const axios = useAxios();
  const queryClient = useQueryClient();

  // 🔥 NEW STATE
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["seller-orders", mongoUser?._id],
    enabled: !!mongoUser?._id && !mongoUserLoading,
    queryFn: async () => {
      const { data } = await axios.get(`/seller-orders/${mongoUser._id}`);
      return data;
    },
  });

  // ✅ STATUS UPDATE
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }) => {
      return axios.patch(`/orders/${orderId}/status`, { status });
    },
    onSuccess: () => {
      toast.success("Order status updated");
      queryClient.invalidateQueries(["seller-orders", mongoUser._id]);
    },
  });

  // ✅ CANCEL MUTATION (IMPORTANT 🔥)
  const cancelMutation = useMutation({
    mutationFn: async ({ orderId, reason }) => {
      return axios.patch(`/orders/${orderId}/status`, {
        status: "cancelled",
        cancelledBy: "seller", // 🔥 KEY POINT
        reason,
      });
    },
    onSuccess: () => {
      toast.success("Order cancelled");
      queryClient.invalidateQueries(["seller-orders", mongoUser._id]);
    },
    onError: () => {
      toast.error("Cancel failed");
    },
  });

  const handleNextStatus = (order) => {
    const status = nextStatus[order.orderStatus];
    if (!status) return;
    updateStatusMutation.mutate({ orderId: order._id, status });
  };

  const handleCancelConfirm = () => {
    if (!cancelReason.trim()) {
      return toast.error("Please enter reason");
    }

    cancelMutation.mutate({
      orderId: selectedOrder._id,
      reason: cancelReason,
    });

    setCancelModal(false);
    setCancelReason("");
    setSelectedOrder(null);
  };

  const handlePrint = (orderId) => {
    window.open(`/invoice/${orderId}`, "_blank");
  };

  if (isLoading || mongoUserLoading) {
    return <Skeleton count={6} height={40} />;
  }

  const activeOrders = orders.filter(
    (o) =>
      !["cancelled", "completed", "refund-request"].includes(o.orderStatus),
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Seller Order Management</h2>

      <table className="table w-full bg-white rounded-xl shadow">
        <thead>
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
              <td>{o.orderId}</td>
              <td>{o.userEmail}</td>

              <td>
                <span className={`badge ${statusBadge[o.orderStatus]}`}>
                  {o.orderStatus}
                </span>
              </td>

              <td>
                <button
                  onClick={() => handlePrint(o._id)}
                  className="btn btn-xs"
                >
                  Print
                </button>
              </td>

              <td className="space-x-2">
                {nextStatus[o.orderStatus] && (
                  <button
                    onClick={() => handleNextStatus(o)}
                    className="btn btn-xs btn-success"
                  >
                    Mark {nextStatus[o.orderStatus]}
                  </button>
                )}

                {/* 🔥 CANCEL BUTTON */}
                <button
                  onClick={() => {
                    setSelectedOrder(o);
                    setCancelModal(true);
                  }}
                  className="btn btn-xs btn-error"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 CANCEL MODAL */}
      {cancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h3 className="font-bold text-lg">
              Cancel Order ({selectedOrder?.orderId})
            </h3>

            <textarea
              placeholder="Enter cancel reason..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setCancelModal(false)} className="btn">
                Close
              </button>

              <button onClick={handleCancelConfirm} className="btn btn-error">
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerOrderManagement;
