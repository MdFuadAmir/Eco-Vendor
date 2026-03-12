import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AddAddressModal from "./AddAddressModal";
import useAxios from "../../../../Hooks/useAxios";
import useAuth from "../../../../Hooks/useAuth";

const AddressBook = () => {
  const axiosPublic = useAxios();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { data: addresses = [], refetch } = useQuery({
    queryKey: ["addresses", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/addresses?email=${user.email}`);
      return data;
    },
  });

  const deleteAddress = async (id) => {
    await axiosPublic.delete(`/addresses/${id}`);
    refetch();
  };

  const openAdd = () => {
    setSelectedAddress(null);
    setOpen(true);
  };

  const openEdit = (addr) => {
    setSelectedAddress(addr);
    setOpen(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📍 Address Book</h2>

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div key={addr._id} className="bg-white p-4 rounded-xl shadow">
            <p className="font-semibold">{addr.fullName}</p>

            <p className="text-sm text-gray-500">
              {addr.addressLine}, {addr.area}, {addr.district}, {addr.division}
            </p>

            <p className="text-sm">{addr.phone}</p>

            <div className="mt-2 space-x-2">
              <button
                onClick={() => openEdit(addr)}
                className="btn btn-xs btn-outline"
              >
                Edit
              </button>

              <button
                onClick={() => deleteAddress(addr._id)}
                className="btn btn-xs btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={openAdd} className="btn btn-primary mt-4">
        + Add New Address
      </button>

      {open && (
        <AddAddressModal
          close={() => setOpen(false)}
          refetch={refetch}
          address={selectedAddress}
        />
      )}
    </div>
  );
};

export default AddressBook;
