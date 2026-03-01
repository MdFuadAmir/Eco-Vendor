import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import toast from "react-hot-toast";
import DTitle from "../../../../Utils/DTitle/DTitle";
import { FaStore } from "react-icons/fa6";

const AdminSellerManagement = () => {
  const axiosPublic = useAxios();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);

  // ========== Fetch all sellers ==========
  const { data: sellers = [], isLoading } = useQuery({
    queryKey: ["only-sellers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/only-sellers");
      return res.data;
    },
  });

  // ========== Block / Unblock ==========
  const banToggleMutation = useMutation({
    mutationFn: async (seller) =>
      axiosPublic.patch(`/users/${seller._id}/block`, {
        blocked: !seller.blocked,
      }),
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries(["only-sellers"]);
    },
  });

  // ========== Suspend / Unsuspend ==========
  const suspendToggleMutation = useMutation({
    mutationFn: async (seller) => {
      const newStatus = seller.status === "Suspended" ? "Active" : "Suspended";
      return axiosPublic.patch(`/users/${seller._id}/status`, {
        status: newStatus,
      });
    },
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries(["only-sellers"]);
    },
  });

  // ========== View seller modal ==========
  const handleView = (seller) => {
    setSelectedSeller(seller);
    setModalOpen(true);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <DTitle label={"Manage Sellers"} icon={FaStore} />

      <div className="overflow-x-auto bg-white dark:bg-darkfooter/90 rounded-xl shadow mt-4">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-darknav dark:text-white">
            <tr>
              <th>Seller</th>
              <th>Verification</th>
              <th>Products</th>
              <th>Commission</th>
              <th>Rating</th>
              <th>Payout</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="dark:text-gray-200">
            {sellers.map((seller) => (
              <tr key={seller._id}>
                {/* Seller Info */}
                <td>
                  <p className="font-semibold">{seller.name}</p>
                  <p className="text-sm text-gray-500">{seller.email}</p>
                  <p className="text-sm text-gray-400">
                    {seller.sellerInfo?.shopName}
                  </p>
                </td>

                {/* Verification */}
                <td>
                  <button
                    onClick={() => handleView(seller)}
                    className="btn btn-xs btn-info"
                  >
                    View Doc
                  </button>
                </td>
                {/* Products count */}
                <td><button className="btn btn-xs btn-accent">Set Limit</button></td>

                {/* Commission */}
                <td><button className="btn btn-xs btn-accent">Set Commition</button></td>

                {/* Rating */}
                <td>
                  {seller.sellerInfo?.rating ? (
                    <span className="flex items-center gap-1">
                      {seller.sellerInfo.rating.toFixed(1)}
                      <span className="text-yellow-400">★</span>
                    </span>
                  ) : (
                    "N/A"
                  )}
                </td>

                {/* Payout */}
                <td><button className="btn btn-xs">Payment</button></td>

                {/* Actions */}
                <td className="space-x-2">
                  <button
                    onClick={() => banToggleMutation.mutate(seller)}
                    className={`btn btn-xs ${
                      seller.blocked ? "btn-success" : "btn-error"
                    }`}
                  >
                    {seller.blocked ? "Unblock" : "Block"}
                  </button>

                  <button
                    onClick={() => suspendToggleMutation.mutate(seller)}
                    className="btn btn-xs btn-warning"
                  >
                    {seller.status === "Suspended" ? "Unsuspend" : "Suspend"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sellers.length === 0 && (
          <p className="text-center py-6 text-gray-500">No sellers found</p>
        )}
      </div>

      {/* ===== Modal for View Seller Info ===== */}
      {modalOpen && selectedSeller && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white dark:bg-darknav rounded-xl p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-3 right-3 btn btn-sm btn-circle"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 dark:text-gray-100">
              {selectedSeller.name} - {selectedSeller.sellerInfo?.shopName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:text-gray-200">
              <div>
                <p>
                  <strong>Email:</strong> {selectedSeller.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedSeller.sellerInfo?.phone}
                </p>
                <p>
                  <strong>Division:</strong>{" "}
                  {selectedSeller.sellerInfo?.division}
                </p>
                <p>
                  <strong>District:</strong>{" "}
                  {selectedSeller.sellerInfo?.district}
                </p>
                <p>
                  <strong>Address:</strong> {selectedSeller.sellerInfo?.address}
                </p>
              </div>

              <div>
                <p>
                  <strong>Payment Method:</strong>{" "}
                  {selectedSeller.sellerInfo?.paymentMethod}
                </p>
                <p>
                  <strong>Account Name:</strong>{" "}
                  {selectedSeller.sellerInfo?.accountName}
                </p>
                <p>
                  <strong>Account Number:</strong>{" "}
                  {selectedSeller.sellerInfo?.accountNumber}
                </p>
                <p>
                  <strong>Stock Availability:</strong>{" "}
                  {selectedSeller.sellerInfo?.hasStock}
                </p>
                <p>
                  <strong>Business Type:</strong>{" "}
                  {selectedSeller.sellerInfo?.businessType}
                </p>
                <p>
                  <strong>Commission:</strong>{" "}
                  {selectedSeller.sellerInfo?.commission || "N/A"}%
                </p>
                <p>
                  <strong>Rating:</strong>{" "}
                  {selectedSeller.sellerInfo?.rating || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSellerManagement;
