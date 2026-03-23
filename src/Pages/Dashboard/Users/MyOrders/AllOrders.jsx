import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxios from "../../../../Hooks/useAxios";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import OrderTracking from "../OrderTracking/OrderTracking";

const AllOrders = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [actionType, setActionType] = useState("");

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orders", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(`/my-orders/${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const handleConfirmAction = async () => {
    try {
      if (!cancelReason.trim()) {
        return toast.error("Please enter a reason");
      }

      if (actionType === "cancel") {
        await axios.patch(`/orders/${cancelOrderId}/cancel`, {
          reason: cancelReason,
        });
        toast.success("Order cancelled");
      }

      if (actionType === "refund") {
        await axios.post("/refund-request", {
          orderId: cancelOrderId,
          reason: cancelReason,
        });
        toast.success("Refund request sent");
      }

      setCancelModal(false);
      setCancelReason("");
      setCancelOrderId(null);
      setActionType("");

      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!user?.email) return null;

  return (
    <div className="p-6 space-y-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow rounded-xl p-4 space-y-4"
        >
          {/* TOP */}
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-semibold">{order.orderId}</p>
              <p className="text-sm text-gray-500">
                {dayjs(order.createdAt).format("YYYY-MM-DD HH:mm")}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded text-sm font-medium ${
                order.orderStatus === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.orderStatus === "shipped"
                    ? "bg-blue-100 text-blue-700"
                    : order.orderStatus === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
              }`}
            >
              {order.orderStatus}
            </span>
          </div>

          {/* PRODUCTS */}
          <div className="space-y-3">
            {order.products.map((p) => (
              <div
                key={p._id}
                className="flex items-center gap-4 border rounded p-2"
              >
                <img
                  src={p.image || "/placeholder.png"}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-500">
                    {p.quantity} x {p.price}
                  </p>
                </div>
                <p className="font-semibold">{p.quantity * p.price}</p>
              </div>
            ))}
          </div>

          {/* BOTTOM */}
          <div className="flex justify-between items-center border-t pt-3">
            <div>
              <p className="text-sm">
                Payment: {order.paymentStatus} ({order.paymentMethod})
              </p>
              <p className="font-bold">Total: {order.total}</p>

              {order.orderStatus === "cancelled" && (
                <p className="text-red-500 text-sm">
                  Cancelled by: {order.cancelledBy}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              {/* track order */}
              <button
                onClick={() => setTrackingOrder(order)}
                className="bg-purple-500 text-white px-4 py-1 rounded"
              >
                Track
              </button>
              {/* VIEW BUTTON */}
              <button
                onClick={() => setSelectedOrder(order)}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                View
              </button>
              {/* CANCEL / REFUND */}
              {["pending", "accepted", "packed"].includes(order.orderStatus) &&
                (order.paymentMethod === "cod" ? (
                  <button
                    onClick={() => {
                      setCancelOrderId(order._id);
                      setActionType("cancel");
                      setCancelModal(true);
                    }}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Cancel Order
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCancelOrderId(order._id);
                      setActionType("refund");
                      setCancelModal(true);
                    }}
                    className="bg-orange-500 text-white px-4 py-1 rounded"
                  >
                    Refund & Cancel
                  </button>
                ))}
            </div>
          </div>

          {/* REFUND STATUS */}
          {order.refundStatus === "requested" && (
            <p className="text-yellow-500 text-sm">Refund Requested</p>
          )}
          {order.refundStatus === "approved" && (
            <p className="text-green-500 text-sm">Refunded Pending</p>
          )}
          {order.refundStatus === "refunded" && (
            <p className="text-green-500 text-sm">Refunded</p>
          )}
        </div>
      ))}

      {/* ✅ VIEW MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4">
              Order: {selectedOrder.orderId}
            </h3>

            <p>Status: {selectedOrder.orderStatus}</p>
            <p>Total: {selectedOrder.total}</p>

            <div className="mt-4 space-y-2">
              {selectedOrder.products.map((p) => (
                <div key={p._id} className="flex gap-3">
                  <img src={p.image} className="w-12 h-12" />
                  <p>{p.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ✅ CANCEL / REFUND MODAL */}
      {cancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold">
              {actionType === "cancel" ? "Cancel Order" : "Refund Request"}
            </h3>

            <textarea
              placeholder="Write your reason..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full border rounded p-2"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setCancelModal(false);
                  setCancelReason("");
                }}
                className="px-4 py-1 bg-gray-300 rounded"
              >
                Close
              </button>

              <button
                onClick={handleConfirmAction}
                className="px-4 py-1 bg-red-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ✅ TRACKING MODAL */}
{trackingOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-2xl relative">
      <button
        onClick={() => setTrackingOrder(null)}
        className="absolute top-2 right-3 text-xl"
      >
        ✕
      </button>

      <h3 className="text-xl font-bold mb-4">
        Tracking: {trackingOrder.orderId}
      </h3>

      {/* 🔥 TRACKING COMPONENT */}
      <OrderTracking order={trackingOrder} />
    </div>
  </div>
)}
    </div>
  );
};

export default AllOrders;
