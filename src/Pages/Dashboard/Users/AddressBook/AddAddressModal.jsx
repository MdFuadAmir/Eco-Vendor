import { useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../../../../Hooks/useAxios";
import useAuth from "../../../../Hooks/useAuth";

const AddAddressModal = ({ close, refetch, address }) => {
  const axiosPublic = useAxios();
  const { user } = useAuth();

  const [form, setForm] = useState(() => ({
    fullName: address?.fullName || "",
    phone: address?.phone || "",
    division: address?.division || "",
    district: address?.district || "",
    area: address?.area || "",
    addressLine: address?.addressLine || "",
  }));

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (address) {
        await axiosPublic.patch(`/addresses/${address._id}`, form);

        toast.success("Address updated");
      } else {
        await axiosPublic.post("/addresses", {
          ...form,
          userEmail: user.email,
        });

        toast.success("Address added");
      }

      refetch();
      close();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-100">
        <h2 className="text-xl font-bold mb-4">
          {address ? "Edit Address" : "Add Address"}
        </h2>

        <form onSubmit={submit} className="space-y-3">
          <input
            name="fullName"
            value={form.fullName}
            placeholder="Full Name"
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <input
            name="phone"
            value={form.phone}
            placeholder="Phone"
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <input
            name="division"
            value={form.division}
            placeholder="Division"
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <input
            name="district"
            value={form.district}
            placeholder="District"
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <input
            name="area"
            value={form.area}
            placeholder="Area"
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <input
            name="addressLine"
            value={form.addressLine}
            placeholder="House / Road"
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {address ? "Update" : "Save"}
            </button>

            <button
              type="button"
              onClick={close}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
