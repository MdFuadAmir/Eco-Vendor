import { useForm } from "react-hook-form";
import NIDImageUploader from "./NIDImageUploader";
import useAxios from "../../../../Hooks/useAxios";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
const SellerRequest = () => {
  const axiosPublic = useAxios();
  const { register, handleSubmit, setValue } = useForm();
  const { user: firebaseUser } = useAuth();
  const [uploading, setUploading] = useState(false);

  const { data: dbUser } = useQuery({
    queryKey: ["dbUser", firebaseUser?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/users/by-email?email=${firebaseUser.email}`,
      );
      return res.data;
    },
    enabled: !!firebaseUser?.email,
  });
  const onSubmit = async (data) => {
    if (!dbUser?._id) {
      return alert("User not loaded yet");
    }
    try {
      const response = await axiosPublic.patch(
        `/users/${dbUser._id}/seller`,
        data,
      );
      if (response.data.success) {
        toast.success("Seller request send successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto p-6 bg-base-100 dark:bg-darknav/80 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-2 dark:text-white">
          Become a Seller
        </h2>
        <p className="text-gray-500 dark:text-gray-300 mb-4">
          Please fill all information carefully to request seller account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Shop Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              placeholder="Shop Name"
              {...register("shopName", { required: true })}
            />

            <input
              className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              placeholder="Shop Slug"
              {...register("shopSlug", { required: true })}
            />
          </div>
          <textarea
            className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
            placeholder="Shop Description"
            {...register("shopDescription", { required: true })}
          />
          <NIDImageUploader setValue={setValue} setUploading={setUploading} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Owner Info */}
            <input
              {...register("phone", { required: true })}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              placeholder="Phone Number"
            />
            <input
              {...register("nidNumber", { required: true })}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              placeholder="NID Number"
            />
            {/* Address */}
            <input
              {...register("division", { required: true })}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              placeholder="Division"
            />
            <input
              {...register("district", { required: true })}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              placeholder="District"
            />
          </div>
          <textarea
            {...register("address", { required: true })}
            className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
            placeholder="Full Address"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Payment */}
            <select
              {...register("paymentMethod", { required: true })}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
            >
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="bank">Bank</option>
            </select>
            <input
              {...register("accountNumber", { required: true })}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              placeholder="Account Number"
            />
            <input
              {...register("accountName", { required: true })}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
              placeholder="Account Name"
            />
          </div>
          <select
            {...register("businessType")}
            className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
          >
            <option value="individual">Individual</option>
            <option value="business">Business</option>
            <option value="company">Company</option>
          </select>
          <select
            {...register("hasStock")}
            className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
          >
            <option value="yes">I have stock</option>
            <option value="no">I will source products</option>
          </select>

          {/* Agreement */}
          <label className="flex gap-2 dark:text-gray-300">
            <input type="checkbox" {...register("terms", { required: true })} />
            I agree to terms & conditions
          </label>

          <button className={`btn btn-primary w-full`} disabled={uploading}>
            {uploading ? "Uploading images..." : "Submit Seller Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerRequest;
