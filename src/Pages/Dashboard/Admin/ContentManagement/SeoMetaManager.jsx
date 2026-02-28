import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import useAxios from "../../../../Hooks/useAxios";
import DTitle from "../../../../Utils/DTitle/DTitle";
import { TbSeo } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";

const SeoMetaManager = () => {
  const axiosPublic = useAxios();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [selectedMeta, setSelectedMeta] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  // Fetch all meta
  const { data: metas = [], isLoading } = useQuery({
    queryKey: ["seoMetas"],
    queryFn: async () => {
      const res = await axiosPublic.get("/content/seo");
      return res.data;
    },
  });

  // Add meta
  const addMutation = useMutation({
    mutationFn: (data) => axiosPublic.post("/content/seo", data),
    onSuccess: () => {
      toast.success("Meta added successfully");
      queryClient.invalidateQueries(["seoMetas"]);
      reset();
      setShowModal(false);
    },
  });

  // Update meta
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => axiosPublic.patch(`/content/seo/${id}`, data),
    onSuccess: () => {
      toast.success("Meta updated successfully");
      queryClient.invalidateQueries(["seoMetas"]);
      reset();
      setSelectedMeta(null);
      setShowModal(false);
    },
  });

  // Delete meta
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/content/seo/${id}`),
    onSuccess: () => {
      toast.success("Meta deleted successfully");
      queryClient.invalidateQueries(["seoMetas"]);
    },
  });

  const onSubmit = (data) => {
    if (selectedMeta) {
      updateMutation.mutate({ id: selectedMeta._id, data });
    } else {
      addMutation.mutate(data);
    }
  };

  const handleEdit = (meta) => {
    setSelectedMeta(meta);
    setShowModal(true);
    setValue("page", meta.page);
    setValue("title", meta.title);
    setValue("description", meta.description);
    setValue("keywords", meta.keywords);
    setValue("image", meta.image);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center gap-4">
        <DTitle label={"SEO Meta Manager"} icon={TbSeo} />
      <button
        className="btn btn-primary mb-4"
        onClick={() => {
          reset();
          setSelectedMeta(null);
          setShowModal(true);
        }}
      >
        <FaPlus /> Add New Meta
      </button>
      </div>

      <div className="overflow-x-auto mx-auto max-w-4xl bg-white dark:bg-darkfooter/90 rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-darknav dark:text-white">
            <tr>
              <th>Page</th>
              <th>Title</th>
              <th>Description</th>
              <th>Keywords</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="dark:text-gray-300">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5}>
                      <Skeleton count={1} height={25} />
                    </td>
                  </tr>
                ))
              : metas.map((meta) => (
                  <tr key={meta._id}>
                    <td>{meta.page}</td>
                    <td>{meta.title}</td>
                    <td>{meta.description}</td>
                    <td>{meta.keywords}</td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-xs btn-accent"
                        onClick={() => handleEdit(meta)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => deleteMutation.mutate(meta._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-darknav p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 dark:text-white">
              {selectedMeta ? "Edit Meta" : "Add New Meta"}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <label className="dark:text-gray-300">Page</label>
              <input
                {...register("page", { required: true })}
                placeholder="Page Name"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              />
              <label className="dark:text-gray-300">title</label>
              <input
                {...register("title", { required: true })}
                placeholder="Title"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              />
              <label className="dark:text-gray-300">description</label>
              <input
                {...register("description")}
                placeholder="Description"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              />
              <label className="dark:text-gray-300">keywords</label>
              <input
                {...register("keywords")}
                placeholder="Keywords"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              />
              <label className="dark:text-gray-300">image url</label>
              <input
                {...register("image")}
                placeholder="Image URL"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeoMetaManager;
