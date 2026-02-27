import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import toast from "react-hot-toast";
import SliderSkeletonRow from "../../../../Components/SliderSkeletonRow";
import DTitle from "../../../../Utils/DTitle/DTitle";
import { BiSolidOffer } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";

const OfferSlider = () => {
  const axiosPublic = useAxios();
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const queryClient = useQueryClient();
  // fetch all sliders
  const { data: sliders = [], isLoading } = useQuery({
    queryKey: ["offerSliders"],
    queryFn: async () => {
      const res = await axiosPublic.get("/content/offerSliders");
      return res.data;
    },
  });
  const addMutation = useMutation({
    mutationFn: async (data) => axiosPublic.post("/content/offerSliders", data),
    onSuccess: () => {
      toast.success("Slider added");
      queryClient.invalidateQueries(["offerSliders"]);
      reset();
      setShowModal(false);
    },
  });
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) =>
      axiosPublic.patch(`/content/offerSliders/${id}`, data),
    onSuccess: () => {
      toast.success("Slider updated");
      queryClient.invalidateQueries(["offerSliders"]);
      reset();
      setSelectedSlider(null);
      setShowModal(false);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosPublic.delete(`/content/offerSliders/${id}`),
    onSuccess: () => {
      toast.success("Slider deleted");
      queryClient.invalidateQueries(["offerSliders"]);
    },
  });
  const onSubmit = (data) => {
    if (selectedSlider) {
      updateMutation.mutate({ id: selectedSlider._id, data });
    } else {
      addMutation.mutate(data);
    }
  };
  const handleEdit = (slider) => {
    setSelectedSlider(slider);
    setShowModal(true);
    setValue("image", slider.image);
    setValue("link", slider.link);
    setValue("status", slider.status);
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <DTitle label={"Offer slider manager"} icon={BiSolidOffer} />
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedSlider(null);
            reset();
            setShowModal(true);
          }}
        >
          <FaPlus /> Add New Offer
        </button>
      </div>
      <div className="overflow-x-auto mx-auto max-w-3xl bg-white dark:bg-darkfooter/90 rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 rounded-xl dark:bg-darknav dark:text-white">
            <tr>
              <th>Preview</th>
              <th>Link</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <SliderSkeletonRow key={i} />
                ))
              : sliders.map((slider) => (
                  <tr key={slider._id}>
                    <td>
                      <img
                        src={slider.image}
                        alt="slider"
                        className="w-24 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="text-blue-500">{slider.link}</td>
                    <td>
                      <span
                        className={`badge ${
                          slider.status === "active"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {slider.status}
                      </span>
                    </td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-xs btn-accent"
                        onClick={() => handleEdit(slider)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => deleteMutation.mutate(slider._id)}
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
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-darknav p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {selectedSlider ? "Edit Slider" : "Add New Slider"}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <input
                {...register("image", { required: true })}
                placeholder="Image URL"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                {...register("link")}
                placeholder="Link"
                className="w-full px-4 py-2 border rounded"
              />
              <select
                {...register("status")}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-error"
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

export default OfferSlider;
