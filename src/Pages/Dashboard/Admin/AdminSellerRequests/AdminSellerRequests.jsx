import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import toast from "react-hot-toast";
import DTitle from "../../../../Utils/DTitle/DTitle";
import { MdRequestPage } from "react-icons/md";
import Search from "../../../../Components/Search/Search";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminSellerRequests = () => {
  const axiosPublic = useAxios();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // fetch seller requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["sellerRequests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/seller-requests");
      return res.data;
    },
  });

  // approve mutation
  const approveMutation = useMutation({
    mutationFn: async (id) => axiosPublic.patch(`/users/approve-seller/${id}`),
    onSuccess: () => {
      toast.success("Seller approved");
      queryClient.invalidateQueries(["sellerRequests"]);
    },
  });

  // reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => axiosPublic.patch(`/users/reject-seller/${id}`),
    onSuccess: () => {
      toast.success("Seller rejected");
      queryClient.invalidateQueries(["sellerRequests"]);
    },
  });

  const handleView = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const filteredUsers = requests.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <DTitle label={"Seller Requests"} icon={MdRequestPage} />
      <div className="w-md pb-6">
        <Search
          value={search}
          onChange={setSearch}
          placeholder="Search user by name or email"
        />
      </div>

      <div className="overflow-x-auto mx-auto bg-white dark:bg-darkfooter/90 rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-darknav dark:text-white">
            <tr>
              <th>User</th>
              <th>Shop</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="dark:text-gray-200">
            {isLoading
              ? Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i}>
                      <td>
                        <Skeleton height={14} width={100} />
                        <Skeleton height={12} width={140} />
                      </td>
                      <td>
                        <Skeleton height={14} width={120} />
                      </td>
                      <td>
                        <Skeleton height={14} width={100} />
                      </td>
                      <td>
                        <Skeleton height={14} width={140} />
                      </td>
                      <td>
                        <Skeleton height={14} width={90} />
                      </td>
                      <td className="flex gap-2">
                        <Skeleton height={30} width={50} />
                        <Skeleton height={30} width={60} />
                        <Skeleton height={30} width={50} />
                      </td>
                    </tr>
                  ))
              : filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <p>{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </td>
                    <td>{user.sellerInfo?.shopName}</td>
                    <td>{user.sellerInfo?.phone}</td>
                    <td>
                      {user.sellerInfo?.district}, {user.sellerInfo?.division}
                    </td>
                    <td>{user.sellerInfo?.paymentMethod}</td>
                    <td className="flex flex-wrap gap-4">
                      <button
                        onClick={() => handleView(user)}
                        className="btn btn-xs btn-active"
                      >
                        View
                      </button>
                      <button
                        onClick={() => approveMutation.mutate(user._id)}
                        className="btn btn-xs btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(user._id)}
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {!isLoading && requests.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No pending seller requests
          </p>
        )}
      </div>

      {/* Modal */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-darknav/80 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost dark:text-white"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 dark:text-gray-100">
              {selectedUser.name} - {selectedUser.email}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm dark:text-gray-200">
              <div>
                <p>
                  <b>Shop Name:</b> {selectedUser.sellerInfo?.shopName}
                </p>
                <p>
                  <b>Shop Slug:</b> {selectedUser.sellerInfo?.shopSlug}
                </p>
                <p>
                  <b>Description:</b> {selectedUser.sellerInfo?.shopDescription}
                </p>
              </div>

              <div>
                <p>
                  <b>Phone:</b> {selectedUser.sellerInfo?.phone}
                </p>
                <p>
                  <b>NID:</b> {selectedUser.sellerInfo?.nidNumber}
                </p>
                <p>
                  <b>Address:</b> {selectedUser.sellerInfo?.address}
                </p>
                <p>
                  <b>Division:</b> {selectedUser.sellerInfo?.division}
                </p>
                <p>
                  <b>District:</b> {selectedUser.sellerInfo?.district}
                </p>
              </div>

              <div>
                <p>
                  <b>Payment Method:</b>{" "}
                  {selectedUser.sellerInfo?.paymentMethod}
                </p>
                <p>
                  <b>Account Number:</b>{" "}
                  {selectedUser.sellerInfo?.accountNumber}
                </p>
                <p>
                  <b>Account Name:</b>{" "}
                  {selectedUser.sellerInfo?.accountName}
                </p>
              </div>

              <div>
                <p>
                  <b>Business Type:</b> {selectedUser.sellerInfo?.businessType}
                </p>
                <p>
                  <b>Has Stock:</b> {selectedUser.sellerInfo?.hasStock}
                </p>
                <p>
                  <b>Terms:</b>{" "}
                  {selectedUser.sellerInfo?.terms ? "Agreed" : "Not agreed"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSellerRequests;