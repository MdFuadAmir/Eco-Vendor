import { FaEdit } from "react-icons/fa";
import useMongoUser from "../../../../Hooks/useMongoUser";
import logo from "../../../../assets/Logo/shop.jpg";
import banner from "../../../../assets/banners/shop.jpg";
import useAxios from "../../../../Hooks/useAxios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

const ShopManagement = () => {
  const axiosPublic = useAxios();
  const { mongoUser, mongoUserLoading, refetch } = useMongoUser();
  const [uploading, setUploading] = useState(false);
  const info = mongoUser?.sellerInfo || {};
  const [logoPreview, setLogoPreview] = useState(info?.logo);
  const [coverPreview, setCoverPreview] = useState(info?.cover);

  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      shopName: info?.shopName,
      shopSlug: info?.shopSlug,
      shopDescription: info?.shopDescription,
      phone: info?.phone,
      nidNumber: info?.nidNumber,
      division: info?.division,
      district: info?.district,
      address: info?.address,
      paymentMethod: info?.paymentMethod,
      accountNumber: info?.accountNumber,
      accountName: info?.accountName,
      businessType: info?.businessType,
      logo: info?.logo,
      cover: info?.cover,
      vacationMode: info?.vacationMode,
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosPublic.patch(
        `/users/${mongoUser._id}/seller`,
        data,
      );

      if (res.data.success) {
        toast.success("Shop profile updated successfully");

        setShowModal(false);

        refetch();
      }
    } catch (error) {
      toast.error(error.message || "Update failed");
    }
  };
  const handleVacationToggle = async () => {
    try {
      const res = await axiosPublic.patch(`/users/${mongoUser._id}/seller`, {
        ...info,
        vacationMode: !info?.vacationMode,
      });
      if (res.data.success) {
        toast.success("Vacation mode updated");
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    return data.data.url;
  };

  if (mongoUserLoading) {
    return <p>Loading..</p>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-darknav rounded-xl shadow overflow-hidden my-6">
      {/* Cover */}
      <div className="relative h-56 bg-gray-200 dark:bg-darknav">
        <button
          onClick={() => {
            reset(info);
            setLogoPreview(info?.logo);
            setCoverPreview(info?.cover);
            setShowModal(true);
          }}
          className="absolute right-4 top-4 btn btn-primary btn-sm"
        >
          <FaEdit /> Edit Profile
        </button>
        <img
          src={info?.cover || banner}
          className="w-full h-full object-cover"
          alt="shop cover"
        />
        {/* Logo */}
        <div className="absolute -bottom-10 left-6">
          <img
            src={info?.logo || logo}
            className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover"
          />
        </div>
      </div>
      {/* Shop Info */}
      <div className="pt-14 p-6">
        {/* header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold dark:text-white">
              {info?.shopName || "Shop Name"}
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              @{info?.shopSlug || "shop-slug"}
            </p>
          </div>
          {/* Vacation Mode */}
          <button
            onClick={handleVacationToggle}
            className={`badge cursor-pointer ${
              info?.vacationMode ? "badge-warning" : "badge-success"
            }`}
          >
            {info?.vacationMode ? "Vacation Mode" : "Shop Active"}
          </button>
        </div>
        <hr className="text-gray-500 mb-4" />
        {/* body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* owner info */}
          <div className="bg-gray-100 dark:bg-darkfooter p-4 rounded-lg space-y-3">
            <div>
              <h2 className="text-lg font-bold dark:text-white">
                Owner Information
              </h2>
              <hr className="mt-2 text-gray-500" />
            </div>
            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">Owner:</span>{" "}
              {mongoUser?.name || "Seller"}
            </div>
            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">Email:</span>{" "}
              {mongoUser?.email || "seller@gmail.com"}
            </div>
            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">Role:</span>{" "}
              {mongoUser?.role || "Seller"}
            </div>
            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">Status:</span>{" "}
              {mongoUser?.status === "Active" ? (
                <span className="badge badge-success">Active</span>
              ) : mongoUser?.status === "Suspended" ? (
                <span className="badge badge-error">Suspended</span>
              ) : mongoUser?.status === "pending" ? (
                <span className="badge badge-error">Pending</span>
              ) : null}
            </div>
            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">blocked:</span>{" "}
              {mongoUser?.blocked ? (
                <span className="badge badge-error">Blocked</span>
              ) : (
                <span className="badge badge-success">Active</span>
              )}
            </div>
            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">
                Member Since:
              </span>{" "}
              {new Date(mongoUser?.createdAt).toLocaleDateString()}
            </div>
          </div>
          {/* Shop info */}
          <div className="bg-gray-100 dark:bg-darkfooter p-4 rounded-lg space-y-3">
            <div>
              <h2 className="text-lg font-bold dark:text-white">
                Shop Information
              </h2>
              <hr className="mt-2 text-gray-500" />
            </div>
            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">
                Shop Name:
              </span>{" "}
              {info?.shopName || "Shop Name"}
            </div>
            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">Phone:</span>{" "}
              {info?.phone || "Not provided"}
            </div>
            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">
                NID Number:
              </span>{" "}
              {info?.nidNumber || "Not provided"}
            </div>
            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">
                Business Type:
              </span>{" "}
              {info?.businessType || "Not provided"}
            </div>

            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">
                Payment Method:
              </span>{" "}
              {info?.paymentMethod || "Not provided"}
            </div>

            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">
                Account Name:
              </span>{" "}
              {info?.accountName || "Not provided"}
            </div>
            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">
                Account Number:
              </span>{" "}
              {info?.accountNumber || "Not provided"}
            </div>
            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">Division:</span>{" "}
              {info?.division || "Not provided"}
            </div>
            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">District:</span>{" "}
              {info?.district || "Not provided"}
            </div>

            <div className="dark:text-gray-300">
              <span className="font-semibold dark:text-gray-50">Address:</span>{" "}
              {info?.address || "Not provided"}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-start z-50 overflow-auto py-10">
          <div className="bg-white dark:bg-darknav p-6 rounded-xl w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Edit Shop Profile
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Shop Name + Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="dark:text-gray-300 font-medium">
                    Shop Name
                  </label>
                  <input
                    {...register("shopName")}
                    className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
                    placeholder="Shop Name"
                  />
                </div>

                <div>
                  <label className="dark:text-gray-300 font-medium">
                    Shop Slug
                  </label>
                  <input
                    {...register("shopSlug")}
                    className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
                    placeholder="Shop Slug"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="dark:text-gray-300 font-medium">
                  Shop Description
                </label>
                <textarea
                  {...register("shopDescription")}
                  className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
                  placeholder="Description"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="dark:text-gray-300 font-medium">Phone</label>
                <input
                  {...register("phone")}
                  className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
                  placeholder="Phone"
                />
              </div>

              {/* NID */}
              <div>
                <label className="dark:text-gray-300 font-medium">
                  NID Number
                </label>
                <input
                  {...register("nidNumber")}
                  className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
                  placeholder="NID"
                />
              </div>

              {/* Division */}
              <div>
                <label className="dark:text-gray-300 font-medium">
                  Division
                </label>
                <input
                  {...register("division")}
                  className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
                  placeholder="Division"
                />
              </div>

              {/* District */}
              <div>
                <label className="dark:text-gray-300 font-medium">
                  District
                </label>
                <input
                  {...register("district")}
                  className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
                  placeholder="District"
                />
              </div>

              {/* Address */}
              <div>
                <label className="dark:text-gray-300 font-medium">
                  Address
                </label>
                <input
                  {...register("address")}
                  className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
                  placeholder="Address"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="dark:text-gray-300 font-medium">
                  Payment Method
                </label>
                <select
                  {...register("paymentMethod")}
                  className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:text-gray-200 rounded"
                >
                  <option value="">Select Payment Method</option>
                  <option value="bkash">bKash</option>
                  <option value="nagad">Nagad</option>
                  <option value="bank">Bank</option>
                </select>
              </div>

              {/* Account Number */}
              <div>
                <label className="dark:text-gray-300 font-medium">
                  Account Number
                </label>
                <input
                  {...register("accountNumber")}
                  className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
                  placeholder="Account Number"
                />
              </div>

              {/* Account Name */}
              <div>
                <label className="dark:text-gray-300 font-medium">
                  Account Name
                </label>
                <input
                  {...register("accountName")}
                  className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:placeholder:text-gray-400 dark:text-gray-200 rounded"
                  placeholder="Account Name"
                />
              </div>

              {/* Business Type */}
              <div>
                <label className="dark:text-gray-300 font-medium">
                  Business Type
                </label>
                <select
                  {...register("businessType")}
                  className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:text-gray-200 rounded"
                >
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                  <option value="company">Company</option>
                </select>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="font-semibold dark:text-gray-200">
                  Shop Logo
                </label>

                <div className="border-2 border-dashed p-4 rounded cursor-pointer text-center">
                  <input
                    type="file"
                    hidden
                    id="logoUpload"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      setUploading(true);
                      const url = await uploadImage(file);

                      setLogoPreview(url);
                      setValue("logo", url);

                      setUploading(false);
                    }}
                  />

                  <label htmlFor="logoUpload" className="cursor-pointer">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        className="w-20 h-20 object-cover rounded-full mx-auto"
                      />
                    ) : (
                      <p>Click to upload logo</p>
                    )}
                  </label>
                </div>
              </div>

              {/* Cover Upload */}
              <div>
                <label className="font-semibold dark:text-gray-200">
                  Shop Cover
                </label>

                <div className="border-2 border-dashed p-4 rounded cursor-pointer text-center">
                  <input
                    type="file"
                    hidden
                    id="coverUpload"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      setUploading(true);
                      const url = await uploadImage(file);

                      setCoverPreview(url);
                      setValue("cover", url);

                      setUploading(false);
                    }}
                  />

                  <label htmlFor="coverUpload" className="cursor-pointer">
                    {coverPreview ? (
                      <img
                        src={coverPreview}
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : (
                      <p>Click to upload cover</p>
                    )}
                  </label>
                </div>
              </div>

              {/* Vacation Mode */}
              <label className="flex gap-2 dark:text-gray-200">
                <input type="checkbox" {...register("vacationMode")} />
                Vacation Mode
              </label>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-error"
                >
                  Cancel
                </button>

                <button disabled={uploading} className="btn btn-primary">
                  {uploading ? "Uploading Image..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopManagement;
