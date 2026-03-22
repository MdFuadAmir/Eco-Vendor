import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

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

const AdminManageOrders = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  // 🔥 FETCH
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data } = await axios.get("/admin/orders");
      return data;
    },
  });

  // ✅ STATUS UPDATE
  const updateMutation = useMutation({
    mutationFn: async ({ orderId, status }) => {
      return axios.patch(`/admin/orders/${orderId}/status`, { status });
    },
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries(["admin-orders"]);
    },
  });

  // ✅ CANCEL
  const cancelMutation = useMutation({
    mutationFn: async ({ orderId, reason }) => {
      return axios.patch(`/admin/orders/${orderId}/status`, {
        status: "cancelled",
        reason,
      });
    },
    onSuccess: () => {
      toast.success("Order cancelled");
      queryClient.invalidateQueries(["admin-orders"]);
    },
  });

  // ✅ REFUND PAY
  const refundMutation = useMutation({
    mutationFn: async (orderId) => {
      return axios.patch(`/admin/refund-pay/${orderId}`);
    },
    onSuccess: () => {
      toast.success("Refund completed");
      queryClient.invalidateQueries(["admin-orders"]);
    },
  });

  // 🔥 FILTER LOGIC (IMPORTANT)
  const filteredOrders = orders.filter((o) => {
    if (o.orderStatus === "completed") return false;

    if (o.orderStatus === "cancelled" && o.paymentStatus === "refunded") {
      return false;
    }

    return true;
  });

  const handleNextStatus = (o) => {
    const status = nextStatus[o.orderStatus];
    if (!status) return;

    updateMutation.mutate({ orderId: o._id, status });
  };

  const handleCancelConfirm = () => {
    if (!cancelReason.trim()) {
      return toast.error("Enter reason");
    }

    cancelMutation.mutate({
      orderId: selectedOrder._id,
      reason: cancelReason,
    });

    setCancelModal(false);
    setCancelReason("");
    setSelectedOrder(null);
  };

  if (isLoading) return <Skeleton count={6} height={40} />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📦 Admin Order Management</h2>

      <table className="table w-full bg-white rounded-xl shadow">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.map((o) => (
            <tr key={o._id}>
              <td>{o.orderId}</td>
              <td>{o.userEmail}</td>

              <td>
                <span className="badge badge-info">
                  {o.paymentMethod} ({o.paymentStatus})
                </span>
              </td>

              <td>
                <span className={`badge ${statusBadge[o.orderStatus]}`}>
                  {o.orderStatus}
                </span>
              </td>

              <td className="space-x-2">
                {/* 🔵 VIEW */}
                <button
                  onClick={() => setSelectedOrder(o)}
                  className="btn btn-xs btn-info"
                >
                  View
                </button>

                {/* 🟢 NEXT STATUS */}
                {nextStatus[o.orderStatus] && (
                  <button
                    onClick={() => handleNextStatus(o)}
                    className="btn btn-xs btn-success"
                  >
                    Next
                  </button>
                )}

                {/* 🔴 CANCEL */}
                <button
                  onClick={() => {
                    setSelectedOrder(o);
                    setCancelModal(true);
                  }}
                  className="btn btn-xs btn-error"
                >
                  Cancel
                </button>

                {/* 🟡 REFUND */}
                {o.paymentStatus === "refund_pending" && (
                  <button
                    onClick={() => refundMutation.mutate(o._id)}
                    className="btn btn-xs btn-warning"
                  >
                    Pay Refund
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 VIEW MODAL */}
      {selectedOrder && !cancelModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{selectedOrder.orderId}</h3>

            <p>
              <b>User:</b> {selectedOrder.userEmail}
            </p>
            <p>
              <b>Status:</b> {selectedOrder.orderStatus}
            </p>
            <p>
              <b>Payment:</b> {selectedOrder.paymentStatus}
            </p>

            <p className="mt-3 font-semibold">Products:</p>

            <div className="space-y-2">
              {selectedOrder.products.map((p) => (
                <div key={p._id} className="border p-2 rounded">
                  {p.name} - {p.quantity} x {p.price}
                </div>
              ))}
            </div>

            <p className="mt-4">
              <b>Total:</b> {selectedOrder.total}
            </p>

            <button onClick={() => setSelectedOrder(null)} className="btn mt-4">
              Close
            </button>
          </div>
        </div>
      )}

      {/* 🔥 CANCEL MODAL */}
      {cancelModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h3 className="font-bold text-lg">
              Cancel Order ({selectedOrder?.orderId})
            </h3>

            <textarea
              placeholder="Enter reason..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setCancelModal(false)} className="btn">
                Close
              </button>

              <button onClick={handleCancelConfirm} className="btn btn-error">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageOrders;
