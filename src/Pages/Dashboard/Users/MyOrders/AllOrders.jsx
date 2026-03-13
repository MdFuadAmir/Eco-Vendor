import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxios from "../../../../Hooks/useAxios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-600",
  accepted: "bg-blue-100 text-blue-600",
  packed: "bg-purple-100 text-purple-600",
  shipped: "bg-indigo-100 text-indigo-600",
  completed: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-600",
};

const AllOrders = () => {
  const { user } = useAuth();
  const axiosPublic = useAxios();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/my-orders/${user.email}`);
      return data;
    },
  });

  // Skeleton Loader
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border p-4 rounded-xl">
            <Skeleton height={20} width={200} />
            <Skeleton height={15} width={120} className="mt-2" />

            <div className="mt-4 space-y-2">
              <Skeleton height={60} />
              <Skeleton height={60} />
            </div>

            <Skeleton height={30} width={120} className="mt-4" />
          </div>
        ))}
      </div>
    );
  }

  if (!orders.length) return <p>No orders found</p>;

  return (
    <>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <div>
                <p className="font-semibold">Order ID: {order.orderId}</p>
                <p className="text-sm text-gray-500">{order.shopName}</p>
                <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  statusColor[order.orderStatus]
                }`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* Products */}
            <div className="space-y-3">
              {order.products.map((product) => (
                <div
                  key={product._id}
                  className="flex gap-4 items-center border-b pb-2"
                >
                  <img
                    src={product.image}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      ${product.price} × {product.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-3">
              <p className="font-semibold">Total: ${order.total}</p>

              <button
                onClick={() => setSelectedOrder(order)}
                className="px-4 py-1 bg-emerald-500 text-white rounded text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-150 p-6 max-h-[80vh] overflow-y-auto">

            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Order Details</h2>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-red-500"
              >
                Close
              </button>
            </div>

            <p className="mb-2">
              <b>Order ID:</b> {selectedOrder.orderId}
            </p>

            <p className="mb-4">
              <b>Status:</b> {selectedOrder.orderStatus}
            </p>

            <div className="space-y-3">
              {selectedOrder.products.map((p) => (
                <div
                  key={p._id}
                  className="flex gap-4 border p-2 rounded"
                >
                  <img
                    src={p.image}
                    className="w-16 h-16 object-cover"
                  />

                  <div className="flex-1">
                    <p>{p.name}</p>
                    <p className="text-sm text-gray-500">
                      ${p.price} × {p.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ${(p.price * p.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4">
              <p>Products Total: ${selectedOrder.productsTotal}</p>
              <p>Shipping: ${selectedOrder.shippingFee}</p>
              <p className="font-bold text-lg">
                Total: ${selectedOrder.total}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllOrders;