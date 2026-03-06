import { FaUsers } from "react-icons/fa6";
import DTitle from "../../../../Utils/DTitle/DTitle";
import Search from "../../../../Components/Search/Search";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import toast from "react-hot-toast";
import WarningButton from "../../../../Components/WarningButton/WarningButton";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const axiosPublic = useAxios();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/users/only-users");
      return data;
    },
  });

  // Role change
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      return await axiosPublic.patch(`/users/${id}/role`, { role });
    },
    onSuccess: () => {
      toast.success("User role updated successfully");
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Status toggle
  const statusMutation = useMutation({
    mutationFn: async (user) => {
      const newStatus = user.status === "Active" ? "Suspended" : "Active";
      const res = await axiosPublic.patch(`/users/${user._id}/status`, {
        status: newStatus,
      });
      return { ...res.data, newStatus };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Block
  const blockMutation = useMutation({
    mutationFn: async (user) => {
      return axiosPublic.patch(`/users/${user._id}/block`, {
        blocked: !user.blocked,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosPublic.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Search
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );
  const handleView = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };
  return (
    <div className="p-6">
      <DTitle icon={FaUsers} label={"User Management"} />

      {/* Search */}
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
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="dark:text-white">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i}>
                      <td>
                        <Skeleton height={15} width={120} />
                        <Skeleton height={12} width={160} />
                      </td>
                      <td>
                        <Skeleton height={20} width={80} />
                      </td>
                      <td>
                        <Skeleton height={30} width={100} />
                      </td>
                      <td className="flex gap-2">
                        <Skeleton height={30} width={70} />
                        <Skeleton height={30} width={70} />
                        <Skeleton height={30} width={70} />
                        <Skeleton height={30} width={70} />
                      </td>
                    </tr>
                  ))
              : filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          user.status === "Active"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>
                      <select
                        className="select select-sm dark:bg-darkbody"
                        value={user.role}
                        onChange={(e) =>
                          roleMutation.mutate({
                            id: user._id,
                            role: e.target.value,
                          })
                        }
                      >
                        <option value="user">User</option>
                        <option value="seller">Seller</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="flex flex-wrap gap-4">
                      <button onClick={() => handleView(user)} className="btn btn-xs">View</button>
                      <WarningButton user={user} />

                      <button
                        onClick={() => statusMutation.mutate(user)}
                        className={`btn btn-xs ${
                          user.status === "Suspended"
                            ? "btn-error"
                            : "btn-success"
                        }`}
                      >
                        {user.status === "Active" ? "Suspended" : "Active"}
                      </button>

                      <button
                        onClick={() => blockMutation.mutate(user)}
                        className={`btn btn-xs ${
                          user.blocked ? "btn-warning" : "btn-accent"
                        }`}
                      >
                        {user.blocked ? "Unblock" : "Block"}
                      </button>

                      <button
                        onClick={() => deleteMutation.mutate(user._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white dark:bg-darknav rounded-xl p-6 max-w-sm w-full relative">
            <button
              className="absolute top-3 right-3 btn btn-sm btn-circle"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 dark:text-gray-100">
              {selectedUser.name} - {selectedUser.sellerInfo?.shopName}
            </h2>

            <div className="dark:text-gray-200 space-y-2">
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.sellerInfo?.phone}
              </p>
              <p>
                <strong>Division:</strong> {selectedUser.sellerInfo?.division}
              </p>
              <p>
                <strong>District:</strong> {selectedUser.sellerInfo?.district}
              </p>
              <p>
                <strong>Address:</strong> {selectedUser.sellerInfo?.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
