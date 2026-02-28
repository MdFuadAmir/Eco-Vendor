import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxios from "../../../../Hooks/useAxios";
import toast from "react-hot-toast";
import { MdCategory } from "react-icons/md";

const Attributes = () => {
  const queryClient = useQueryClient();
  const axiosPublic = useAxios();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    status: "active",
  });

  // Fetch all attributes
  const { data, isLoading } = useQuery({
    queryKey: ["attributes"],
    queryFn: async () => {
      const res = await axiosPublic.get("/attributes");
      return res.data;
    },
  });

  const attributes = Array.isArray(data) ? data : [];

  // Create attribute
  const createMutation = useMutation({
    mutationFn: (data) => axiosPublic.post("/attributes", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["attributes"]);
      closeModal();
    },
  });

  // Update attribute
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => axiosPublic.patch(`/attributes/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["attributes"]);
      closeModal();
    },
  });

  // Delete attribute
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/attributes/${id}`),
    onSuccess: () => {
      toast.success("Attribute deleted successfully");
      queryClient.invalidateQueries(["attributes"]);
    },
  });

  const openAddModal = () => {
    setEditing(null);
    setForm({ name: "", slug: "", status: "active" });
    setOpen(true);
  };

  const openEditModal = (attr) => {
    setEditing(attr);
    setForm({ name: attr.name, slug: attr.slug, status: attr.status });
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateMutation.mutate({ id: editing._id, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleDelete = (id) => deleteMutation.mutate(id);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between mb-3">
        <h1 className="text-xl font-bold dark:text-white flex items-center gap-2"><MdCategory/> Attributes</h1>
        <button onClick={openAddModal} className="btn btn-primary">
          <FaPlus /> Add Attribute
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mx-auto max-w-3xl bg-white dark:bg-darkfooter/90 rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-darknav dark:text-white">
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="dark:text-gray-300">
            {/* Loading Skeleton */}
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton width={80} />
                  </td>
                  <td>
                    <Skeleton width={120} />
                  </td>
                </tr>
              ))}

            {/* Data */}
            {!isLoading &&
              attributes.map((attr) => (
                <tr key={attr._id}>
                  <td>{attr.name}</td>
                  <td>{attr.slug}</td>
                  <td>
                    <span
                      className={`badge ${
                        attr.status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {attr.status}
                    </span>
                  </td>
                  <td className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => openEditModal(attr)}
                      className="btn btn-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        updateMutation.mutate({
                          id: attr._id,
                          data: {
                            status:
                              attr.status === "active" ? "inactive" : "active",
                          },
                        })
                      }
                      className="btn btn-xs btn-warning"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => handleDelete(attr._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            {/* Empty State */}
            {!isLoading && attributes.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-400 py-6">
                  No attributes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-darknav p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4 dark:text-white">
              {editing ? "Edit Attribute" : "Add Attribute"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Attribute Name"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <input
                type="text"
                placeholder="Slug"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
              />

              <select
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:text-gray-200 rounded"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-error"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attributes;
