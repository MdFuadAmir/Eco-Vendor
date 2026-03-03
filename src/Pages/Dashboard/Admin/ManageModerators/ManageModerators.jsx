import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxios from "../../../../Hooks/useAxios";
import DTitle from "../../../../Utils/DTitle/DTitle";
import { FaUserShield } from "react-icons/fa";
import { useState } from "react";
import Search from "../../../../Components/Search/Search";
import WarningButton from "../../../../Components/WarningButton/WarningButton";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ManageModerators = () => {
  const axiosPublic = useAxios();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ===== Fetch admin & moderators =====
  const { data: mods = [], isLoading } = useQuery({
    queryKey: ["admin-moderators"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/admin-moderators");
      return res.data;
    },
  });

  // ===== Suspend / Unsuspend =====
  const suspendMutation = useMutation({
    mutationFn: async (user) => {
      const newStatus = user.status === "Suspended" ? "Active" : "Suspended";
      return axiosPublic.patch(`/users/${user._id}/status`, {
        status: newStatus,
      });
    },
    onSuccess: (res) => {
      toast.success(res.data.message || "Status updated");
      queryClient.invalidateQueries(["admin-moderators"]);
    },
  });

  // ===== Remove moderator (make user) =====
  const makeUserMutation = useMutation({
    mutationFn: async (user) => {
      return axiosPublic.patch(`/users/${user._id}/role`, {
        role: "user",
      });
    },
    onSuccess: (res) => {
      toast.success(res.data.message || "Role updated to user");
      queryClient.invalidateQueries(["admin-moderators"]);
    },
  });

  const filteredUsers = mods.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <DTitle label={"Moderator Management"} icon={FaUserShield} />

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
              <th>Moderator</th>
              <th>Role</th>
              <th>Status</th>
              <th>Activity Log</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="dark:text-gray-100">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i}>
                      <td>
                        <Skeleton height={14} width={120} />
                        <Skeleton height={12} width={160} />
                      </td>
                      <td>
                        <Skeleton height={22} width={90} />
                      </td>
                      <td>
                        <Skeleton height={20} width={80} />
                      </td>
                      <td>
                        <Skeleton height={18} width={140} />
                      </td>
                      <td className="flex gap-2">
                        <Skeleton height={30} width={60} />
                        <Skeleton height={30} width={50} />
                        <Skeleton height={30} width={70} />
                        <Skeleton height={30} width={80} />
                      </td>
                    </tr>
                  ))
              : filteredUsers.map((mod) => (
                  <tr key={mod._id}>
                    {/* Moderator */}
                    <td>
                      <p className="font-semibold">{mod.name}</p>
                      <p className="text-sm text-gray-500">{mod.email}</p>
                    </td>

                    {/* Role */}
                    <td className="capitalize">
                      {mod.role === "admin" ? (
                        <p className="px-4 py-1 bg-emerald-500 w-fit rounded-lg">
                          Admin
                        </p>
                      ) : (
                        <p className="px-4 py-1 bg-orange-500 w-fit rounded-lg">
                          Moderator
                        </p>
                      )}
                    </td>

                    {/* Status */}
                    <td>
                      {mod.status === "Suspended" ? (
                        <span className="badge badge-error">Suspended</span>
                      ) : (
                        <span className="badge badge-success">Active</span>
                      )}
                    </td>

                    {/* Activity */}
                    <td>
                      {new Date(mod.lastLogin).toLocaleString("en-GB", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="flex flex-wrap gap-4">
                      <WarningButton user={mod} />
                      <button
                        onClick={() => {
                          setSelectedUser(mod);
                          setShowModal(true);
                        }}
                        className="btn btn-xs btn-outline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => suspendMutation.mutate(mod)}
                        className={`btn btn-xs ${
                          mod.status === "Suspended"
                            ? "btn-success"
                            : "btn-warning"
                        }`}
                      >
                        {mod.status === "Suspended"
                          ? "Unsuspend"
                          : "Suspend"}
                      </button>

                      <button
                        onClick={() => makeUserMutation.mutate(mod)}
                        className="btn btn-xs btn-error"
                      >
                        Make User
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {!isLoading && mods.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No admin or moderators found
          </p>
        )}
      </div>

      {/* ===== Modal ===== */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-darknav p-6 rounded-xl w-full max-w-lg relative">
            <h3 className="text-xl font-bold mb-4 dark:text-white">
              Admin / Moderator Details
            </h3>

            <div className="space-y-2 text-sm dark:text-gray-300">
              <p>
                <b className="dark:text-gray-100">Name:</b>{" "}
                {selectedUser.name}
              </p>
              <p>
                <b className="dark:text-gray-100">Email:</b>{" "}
                {selectedUser.email}
              </p>
              <p>
                <b className="dark:text-gray-100">Role:</b>{" "}
                {selectedUser.role}
              </p>
              <p>
                <b className="dark:text-gray-100">Status:</b>{" "}
                {selectedUser.status}
              </p>
              <p>
                <b className="dark:text-gray-100">Blocked:</b>{" "}
                {selectedUser.blocked ? "Yes" : "No"}
              </p>

              <p>
                <b className="dark:text-gray-100">Created At:</b>{" "}
                {new Date(selectedUser.createdAt).toLocaleString("en-GB", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>

              <p>
                <b className="dark:text-gray-100">Last Login:</b>{" "}
                {selectedUser.lastLogin
                  ? new Date(selectedUser.lastLogin).toLocaleString("en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "Never"}
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-error btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageModerators;