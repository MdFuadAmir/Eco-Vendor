import { FaUsers } from "react-icons/fa6";
import DTitle from "../../../../Utils/DTitle/DTitle";
import Search from "../../../../Components/Search/Search";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAxios from "../../../../Hooks/useAxios";

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const [warningUser, setWarningUser] = useState(null);
  const [warningText, setWarningText] = useState("");
  const queryClient = useQueryClient();
  const axiosPublic = useAxios();

  // ✅ Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/users/only-users");
      return data;
    },
  });

  // ✅ Status toggle (active <-> suspended)
  const statusMutation = useMutation({
    mutationFn: async (user) => {
      const newStatus = user.status === "Active" ? "Suspended" : "Active";
      return axios.patch(`/users/${user._id}/status`, {
        status: newStatus,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // ✅ Block / Unblock
  const blockMutation = useMutation({
    mutationFn: async (user) => {
      return axios.patch(`/users/${user._id}/block`, {
        blocked: !user.blocked,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // ✅ Delete user
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axios.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // 🔍 Search
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  // 📩 Warning
  const sendWarning = () => {
    alert(`Warning sent to ${warningUser.name}: ${warningText}`);
    setWarningUser(null);
    setWarningText("");
  };

  if (isLoading) return <p>Loading...</p>;

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

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-white dark:bg-gray-900 dark:text-white">
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Orders</th>
              <th>Complaints</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
              >
                {/* User */}
                <td>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </td>

                {/* Status */}
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

                {/* Orders */}
                <td>
                  <button className="btn btn-xs btn-info">
                    {user.orders} Orders
                  </button>
                </td>

                {/* Complaints */}
                <td>
                  <button className="btn btn-xs btn-secondary">
                    {user.complaints} Complaints
                  </button>
                </td>

                {/* Role */}
                <td>
                  <select
                    className="select select-sm dark:bg-gray-600"
                    value={user.role}
                  >
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </td>

                {/* Actions */}
                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => setWarningUser(user)}
                  >
                    Warn
                  </button>

                  {/* Status toggle */}
                  {user.status === "active" ? (
                    <button
                      onClick={() => statusMutation.mutate(user)}
                      className="btn btn-xs btn-outline"
                    >
                      Suspend
                    </button>
                  ) : (
                    <button
                      onClick={() => statusMutation.mutate(user)}
                      className="btn btn-xs btn-outline text-emerald-400"
                    >
                      Active
                    </button>
                  )}

                  {/* Block toggle */}
                  {user.blocked ? (
                    <button
                      onClick={() => blockMutation.mutate(user)}
                      className="btn btn-xs btn-warning"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => blockMutation.mutate(user)}
                      className="btn btn-xs btn-accent"
                    >
                      Block
                    </button>
                  )}

                  {/* Delete */}
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

      {/* Warning Modal */}
      {warningUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96">
            <h3 className="font-bold mb-2 dark:text-white">
              Send Warning to {warningUser.name}
            </h3>
            <textarea
              className="textarea textarea-bordered w-full dark:bg-gray-600 dark:text-white"
              placeholder="Write warning message..."
              value={warningText}
              onChange={(e) => setWarningText(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn btn-sm"
                onClick={() => setWarningUser(null)}
              >
                Cancel
              </button>
              <button className="btn btn-sm btn-error" onClick={sendWarning}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
