import DTitle from "../../../../Utils/DTitle/DTitle";
import { FaFilm, FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxios from "../../../../Hooks/useAxios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SliderSkeletonRow from "../../../../Components/SliderSkeletonRow";

const HomepageSlider = () => {
  const axiosPublic = useAxios();
  const [showModal, setShowModal] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const queryClient = useQueryClient();

  // ✅ Fetch sliders
  const { data: sliders = [], isLoading } = useQuery({
    queryKey: ["sliders"],
    queryFn: async () => {
      const res = await axiosPublic.get("/content/sliders");
      return res.data;
    },
  });
  // ✅ Add slider
  const addSliderMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/content/sliders", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("New slider add successfully");
      queryClient.invalidateQueries(["sliders"]);
      reset();
      setShowModal(false);
    },
  });
  //   update slider
  const updateSliderMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosPublic.patch(`/content/sliders/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Slider updated successfully");
      queryClient.invalidateQueries(["sliders"]);
      reset();
      setShowModal(false);
      setSelectedSlider(null);
    },
  });
  //   edit handler
  const handleEdit = (slider) => {
    setSelectedSlider(slider);
    setShowModal(true);
    setValue("image", slider.image);
    setValue("link", slider.link);
    setValue("status", slider.status);
  };
  //   delete
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/content/sliders/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("slider deleted successfully");
      queryClient.invalidateQueries(["sliders"]);
    },
  });

  const onSubmit = (data) => {
    if (selectedSlider) {
      updateSliderMutation.mutate({
        id: selectedSlider._id,
        data,
      });
    } else {
      addSliderMutation.mutate(data);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <DTitle label={"Homepage Slider Manager"} icon={FaFilm} />
        <button
          onClick={() => {
            setSelectedSlider(null);
            reset();
            setShowModal(true);
          }}
          className="btn btn-primary"
        >
          <FaPlus /> Add New Slider
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mx-auto max-w-3xl bg-white dark:bg-darkfooter/90 rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-darknav dark:text-white">
            <tr>
              <th>Preview</th>
              <th>Link</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <SliderSkeletonRow key={index} />
                ))
              : sliders.map((slider) => (
                  <tr key={slider._id}>
                    <td>
                      <img
                        src={slider?.image}
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
                    <td className="space-x-1">
                      <button
                        onClick={() => handleEdit(slider)}
                        className="btn btn-xs btn-accent"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(slider._id)}
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
        <div className="fixed inset-0 bg-black/70 dark:bg-black/40  flex justify-center items-center z-50">
          <div className="bg-white dark:bg-darknav p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 dark:text-white">
              {/* Add New Slider */}
              {selectedSlider ? "Edit Slider" : "Add New Slider"}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <label className="dark:text-gray-300">image url</label>
              <input
                {...register("image", { required: true })}
                placeholder="Image URL"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              />

              <label className="dark:text-gray-300">link</label>
              <input
                {...register("link")}
                placeholder="link"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              />
              <label className="dark:text-gray-300">Status</label>
              <select
                {...register("status")}
                className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-error"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Slider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default HomepageSlider;
