import { useState } from "react";
import { FaPlus, FaBullhorn } from "react-icons/fa";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxios from "../../../../Hooks/useAxios";
import useMongoUser from "../../../../Hooks/useMongoUser";
import DTitle from "../../../../Utils/DTitle/DTitle";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ManageAds = () => {
  const axiosPublic = useAxios();
  const { mongoUser } = useMongoUser();
  const sellerId = mongoUser?._id;

  const [showModal, setShowModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, reset, setValue, control } = useForm();

  const queryClient = useQueryClient();

  // Fetch seller ads
  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["sellerAds", sellerId],
    enabled: !!sellerId,
    queryFn: async () => {
      const res = await axiosPublic.get(`/seller-ads/${sellerId}`);
      return res.data;
    },
  });

  // Add, update, delete mutations
  const addMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/seller-ads", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Ads added successfully");
      queryClient.invalidateQueries(["sellerAds"]);
      setShowModal(false);
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosPublic.patch(`/seller-ads/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Ads updated");
      queryClient.invalidateQueries(["sellerAds"]);
      setShowModal(false);
      reset();
      setSelectedAd(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/seller-ads/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Ads deleted");
      queryClient.invalidateQueries(["sellerAds"]);
    },
  });

  const imgbbKey = import.meta.env.VITE_IMGBB_KEY;

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return data.data.url;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await handleImageUpload(file);
      setValue("image", imageUrl);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data) => {
    const payload = { ...data, sellerId };

    if (selectedAd) {
      updateMutation.mutate({ id: selectedAd._id, data: payload });
    } else {
      addMutation.mutate(payload);
    }
  };

  const imagePreview = useWatch({ control, name: "image" });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:justify-between mb-6">
        <DTitle label="Shop Ads Manager" icon={FaBullhorn} />
        <button
          onClick={() => {
            reset();
            setSelectedAd(null);
            setShowModal(true);
          }}
          className="btn btn-primary w-fit"
        >
          <FaPlus /> Add Ads
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mx-auto max-w-3xl bg-white dark:bg-darkfooter/90 rounded-xl shadow dark:text-white">
        <table className="table min-w-3xl">
          <thead className="bg-gray-100 dark:bg-darknav dark:text-white">
            <tr className="text-xs">
              <th>Preview</th>
              <th>Title</th>
              <th>Product Link</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading
              ? Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i}>
                      <td>
                        <Skeleton width={96} height={48} />
                      </td>
                      <td>
                        <Skeleton width={120} />
                      </td>
                      <td>
                        <Skeleton width={150} />
                      </td>
                      <td>
                        <Skeleton width={80} />
                      </td>
                      <td>
                        <Skeleton width={180} />
                      </td>
                    </tr>
                  ))
              : ads.map((ad) => (
                  <tr key={ad._id}>
                    <td>
                      <img
                        src={ad.image}
                        className="w-24 h-12 object-cover rounded"
                        alt={ad.title}
                      />
                    </td>
                    <td>{ad.title}</td>
                    <td className="text-blue-500">{ad.productLink}</td>
                    <td>
                      <span
                        className={`badge ${
                          ad.status === "active"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {ad.status}
                      </span>
                    </td>
                    <td className="space-x-2">
                      <button
                        onClick={() => {
                          const activeCount = ads.filter(
                            (a) => a.status === "active",
                          ).length;
                          if (ad.status === "inactive" && activeCount >= 5) {
                            toast.error("Active banner is full");
                            return;
                          }
                          updateMutation.mutate({
                            id: ad._id,
                            data: {
                              status:
                                ad.status === "active" ? "inactive" : "active",
                            },
                          });
                        }}
                        className={`btn btn-xs ${
                          ad.status === "active" ? " btn-error" : "btn-success"
                        }`}
                      >
                        {ad.status === "active" ? "Inactive" : "Active"}
                      </button>

                      <button
                        onClick={() => {
                          setSelectedAd(ad);
                          setShowModal(true);
                          setValue("image", ad.image);
                          setValue("title", ad.title);
                          setValue("productLink", ad.productLink);
                          setValue("status", ad.status);
                        }}
                        className="btn btn-xs btn-accent"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteMutation.mutate(ad._id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-darknav p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              {selectedAd ? "Edit Ads" : "Create Ads"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-gray-300">
                  Ads Image
                </label>

                <label className="cursor-pointer block border-2 border-dashed dark:border-gray-500 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-darkbody">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      className="w-full h-32 object-cover rounded"
                      alt="preview"
                    />
                  ) : (
                    <div className="text-gray-500 text-sm">
                      Click to upload image
                    </div>
                  )}

                  {uploading && (
                    <p className="text-xs mt-2 text-blue-500">Uploading...</p>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              <label className="text-sm font-medium dark:text-gray-300">
                Ads title
              </label>
              <input
                {...register("title")}
                placeholder="Ads Title"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              />
              <label className="text-sm font-medium dark:text-gray-300">
                product link
              </label>
              <input
                {...register("productLink")}
                placeholder="Product Link"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              />

              <select
                {...register("status")}
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-error"
                >
                  Cancel
                </button>

                <button
                  disabled={uploading}
                  type="submit"
                  className="btn btn-primary"
                >
                  {uploading ? "Uploading..." : "Save Ads"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAds;
