import { useState } from "react";
import { FaPlus, FaThList } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import useAxios from "../../../../Hooks/useAxios";

const Subcategories = () => {
  const queryClient = useQueryClient();
  const axiosPublic = useAxios();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    parentId: "",
    status: "active",
  });

  // Fetch categories for select
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Fetch subcategories
  const { data: subsData, isLoading } = useQuery({
    queryKey: ["subcategories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/subcategories");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // 🔐 Safe array
  const subcategories = Array.isArray(subsData) ? subsData : [];

  // Create / Update mutations
  const createMutation = useMutation({
    mutationFn: async (data) => axiosPublic.post("/subcategories", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["subcategories"]);
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) =>
      axiosPublic.patch(`/subcategories/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["subcategories"]);
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosPublic.delete(`/subcategories/${id}`),
    onSuccess: () => {
      toast.success("Subcategory deleted");
      queryClient.invalidateQueries(["subcategories"]);
    },
  });

  const openAddModal = () => {
    setEditing(null);
    setForm({ name: "", slug: "", parentId: "", status: "active" });
    setOpen(true);
  };

  const openEditModal = (sub) => {
    setEditing(sub);
    setForm({
      name: sub.name,
      slug: sub.slug,
      parentId: sub.parentId,
      status: sub.status,
    });
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) updateMutation.mutate({ id: editing._id, data: form });
    else createMutation.mutate(form);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between mb-3">
        <h1 className="text-xl font-bold dark:text-white flex items-center gap-2"><FaThList/> Subcategories</h1>
        <button onClick={openAddModal} className="btn btn-primary">
          <FaPlus /> Add Subcategory
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mx-auto max-w-4xl bg-white dark:bg-darkfooter/90 rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-darknav dark:text-white">
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Parent Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="dark:text-gray-300">
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

            {!isLoading &&
              subcategories.length > 0 &&
              subcategories.map((sub) => (
                <tr key={sub._id}>
                  <td>{sub.name}</td>
                  <td>{sub.slug}</td>
                  <td>{sub.parent.name}</td>
                  <td>
                    <span
                      className={`badge ${sub.status === "active" ? "badge-success" : "badge-error"}`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => openEditModal(sub)}
                      className="btn btn-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        updateMutation.mutate({
                          id: sub._id,
                          data: {
                            status:
                              sub.status === "active" ? "inactive" : "active",
                          },
                        })
                      }
                      className="btn btn-xs btn-warning"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => handleDelete(sub._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            {!isLoading && subcategories.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-6">
                  No subcategories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {/* {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-3">
              {editing ? "Edit Subcategory" : "Add Subcategory"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Subcategory Name"
                className="input input-bordered w-full"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Slug"
                className="input input-bordered w-full"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
              />

              <select
                className="select select-bordered w-full"
                value={form.parentId}
                onChange={(e) => setForm({ ...form, parentId: e.target.value })}
                required
              >
                <option value="">Select Parent Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                className="select select-bordered w-full"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="btn">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-darknav p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4 dark:text-white">
              {editing ? "Edit Subcategory" : "Add Subcategory"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Subcategory Name */}
              <input
                type="text"
                placeholder="Subcategory Name"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              {/* Slug */}
              <input
                type="text"
                placeholder="Slug"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
              />

              {/* Parent Category */}
              <select
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:text-gray-200 rounded"
                value={form.parentId}
                onChange={(e) => setForm({ ...form, parentId: e.target.value })}
                required
              >
                <option value="">Select Parent Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Status */}
              <select
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:text-gray-200 rounded"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {/* Buttons */}
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

export default Subcategories;
