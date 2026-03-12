import { useState } from "react";
import { FaList, FaPlus } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxios from "../../../../Hooks/useAxios";
import toast from "react-hot-toast";

const Categories = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const axiosPublic = useAxios();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    status: "active",
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories");
      return res.data;
    },
  });

  const categories = Array.isArray(data) ? data : [];

  const createMutation = useMutation({
    mutationFn: async (data) => axiosPublic.post("/categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) =>
      axiosPublic.patch(`/categories/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosPublic.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      toast.success("This categori is deleted");
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const openAddModal = () => {
    setEditing(null);
    setForm({ name: "", slug: "", status: "active" });
    setOpen(true);
  };

  const openEditModal = (cat) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      slug: cat.slug,
      status: cat.status,
    });
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
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };
  // 🔹 Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setIsUploading(true);

    try {
      setIsUploading(true);
      toast.loading("Uploading image...", { id: "img-upload" });
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      if (data.success) {
        setForm({ ...form, image: data.data.url });
        toast.success("Image uploaded!", { id: "img-upload" });
      } else {
        toast.error("Image upload failed", { id: "img-upload" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Image upload failed", { id: "img-upload" });
    } finally {
      setIsUploading(false);
      refetch();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between mb-3">
        <h1 className="text-xl font-bold dark:text-white flex items-center gap-2">
          <FaList /> Categories
        </h1>
        <button onClick={openAddModal} className="btn btn-primary">
          <FaPlus /> Add Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mx-auto max-w-4xl bg-white dark:bg-darkfooter/90 rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-darknav dark:text-white">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="dark:text-gray-300">
            {/* 🔄 Loading Skeleton */}
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  <td>
                    <Skeleton width={80} />
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

            {/* ✅ Data */}
            {!isLoading &&
              categories.length > 0 &&
              categories.map((cat) => (
                <tr key={cat._id}>
                  <td>
                    <img
                      src={cat.image}
                      alt="categorie/image"
                      className="w-12 h-12"
                    />
                  </td>
                  <td>{cat.name}</td>
                  <td>{cat.slug}</td>
                  <td>
                    <span
                      className={`badge ${
                        cat.status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td className=" space-x-2">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="btn btn-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        updateMutation.mutate({
                          id: cat._id,
                          data: {
                            status:
                              cat.status === "active" ? "inactive" : "active",
                          },
                        })
                      }
                      className="btn btn-xs btn-warning"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            {/* 🚫 Empty State */}
            {!isLoading && categories.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-400 py-6">
                  No categories found
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
              {editing ? "Edit Category" : "Add Category"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Category Name */}
              <input
                type="text"
                placeholder="Category Name"
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
              {/* Status */}
              <select
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:text-gray-200 rounded"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border w-full px-4 py-2 rounded-lg dark:text-white"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-error"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isUploading}
                >
                  {isUploading
                    ? "Uploading Image..."
                    : editing
                      ? "Update"
                      : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
