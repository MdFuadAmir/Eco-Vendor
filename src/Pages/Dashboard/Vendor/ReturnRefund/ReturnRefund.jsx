import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import useMongoUser from "../../../../Hooks/useMongoUser";
import toast from "react-hot-toast";
import { useState } from "react";

const statusBadge = {
  requested: "badge-warning",
  approved: "badge-success",
  rejected: "badge-error",
};

const ReturnRefund = () => {
  const axios = useAxios();
  const { mongoUser } = useMongoUser();
  const queryClient = useQueryClient();
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["returns", mongoUser?._id],
    enabled: !!mongoUser?._id,
    queryFn: async () => {
      const { data } = await axios.get(
        `/seller-return-refund/${mongoUser._id}`,
      );
      return data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (orderId) => {
      return axios.patch(`/refund-approve/${orderId}`);
    },
    onSuccess: () => {
      toast.success("Refund approved");
      queryClient.invalidateQueries(["returns", mongoUser._id]);
    },
    onError: () => {
      toast.error("Approve failed");
    },
  });
  const rejectMutation = useMutation({
    mutationFn: async ({ orderId, reason }) => {
      return axios.patch(`/refund-reject/${orderId}`, { reason });
    },
    onSuccess: () => {
      toast.success("Refund rejected");
      queryClient.invalidateQueries(["returns", mongoUser._id]);
    },
    onError: () => {
      toast.error("Reject failed");
    },
  });

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🔁 Return & Refund</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Order ID</th>
              <th>Reason</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>
                  <p className="font-semibold">{o.orderId}</p>
                  <p className="text-xs text-gray-500">{o.userEmail}</p>
                </td>
                <td>{o.refundReason || "N/A"}</td>
                <td>
                  <span className="badge badge-info">
                    {o.refundStatus === "requested" ? "Refund" : "Return"}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge ${statusBadge[o.refundStatus] || "badge-warning"}`}
                  >
                    {o.refundStatus}
                  </span>

                  {/* 👉 Reject reason */}
                  {o.refundStatus === "rejected" && (
                    <p className="text-red-500 text-xs mt-1">
                      Reason: {o.refundRejectReason}
                    </p>
                  )}
                </td>
                <td className="space-x-1">
                  {o.refundStatus === "requested" && (
                    <>
                      <button
                        onClick={() => approveMutation.mutate(o._id)}
                        disabled={approveMutation.isPending}
                        className="btn btn-xs btn-success"
                      >
                        {approveMutation.isPending ? "..." : "Approve"}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOrder(o);
                          setRejectModal(true);
                        }}
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h3 className="font-bold text-lg">
              Reject Refund ({selectedOrder?.orderId})
            </h3>

            <textarea
              placeholder="Enter reject reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setRejectModal(false)} className="btn">
                Close
              </button>

              <button
                onClick={() => {
                  if (!rejectReason.trim()) {
                    return toast.error("Enter reason");
                  }

                  rejectMutation.mutate({
                    orderId: selectedOrder._id,
                    reason: rejectReason,
                  });

                  setRejectModal(false);
                  setRejectReason("");
                  setSelectedOrder(null);
                }}
                className="btn btn-error"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnRefund;
