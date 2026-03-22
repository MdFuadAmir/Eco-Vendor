import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../../../Hooks/useAuth";
import useAxios from "../../../../Hooks/useAxios";
import ReviewModal from "./ReviewModal";
import { FaCheck, FaCheckCircle } from "react-icons/fa";

const ToReview = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: orders = [] } = useQuery({
    queryKey: ["my-orders-review", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(`/my-orders/${user.email}/review`);
      return data;
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async ({ order, product, rating, comment }) => {
      await axios.post("/reviews", {
        orderId: order._id,
        productId: product._id,
        userEmail: user.email,
        userName: user.displayName,
        rating,
        comment,
        sellerId: order.sellerId,
      });
    },
    onSuccess: () => {
      toast.success("Review submitted");
      queryClient.invalidateQueries(["my-orders-review"]);
      setSelectedOrder(null);
      setSelectedProduct(null);
    },
  });

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
        >
          {/* ORDER HEADER */}
          <div className="flex justify-between mb-4">
            <div>
              <p className="font-semibold text-gray-800">{order.shopName}</p>
              <p className="text-xs text-gray-500">Order ID: {order.orderId}</p>
              <p className="text-xs text-gray-400">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="font-semibold text-emerald-600">${order.total}</p>
          </div>

          {/* PRODUCTS */}
          <div className="space-y-4">
            {order.products.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-4 border rounded-lg p-3"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {product.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: ${product.price}
                  </p>
                </div>

                {!product.reviewed ? (
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setSelectedProduct(product);
                    }}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                  >
                    Write Review
                  </button>
                ) : (
                  <span className="text-sm text-gray-400 font-medium flex items-center gap-2">
                    Reviewed <FaCheck className="text-xs"/>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* REVIEW MODAL */}
      {selectedOrder && selectedProduct && (
        <ReviewModal
          order={selectedOrder}
          product={selectedProduct}
          closeModal={() => {
            setSelectedOrder(null);
            setSelectedProduct(null);
          }}
          submitReview={({ rating, comment }) =>
            reviewMutation.mutate({
              order: selectedOrder,
              product: selectedProduct,
              rating,
              comment,
            })
          }
        />
      )}
    </div>
  );
};

export default ToReview;
