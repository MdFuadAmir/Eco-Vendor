const AddressBook = () => {
  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">📍 Address Book</h2>

      <div className="space-y-4">
        {[1,2].map(i => (
          <div key={i} className="bg-white p-4 rounded-xl shadow">
            <p className="font-semibold">Home Address</p>
            <p className="text-sm text-gray-500">Kushtia, Bangladesh</p>
            <div className="mt-2 space-x-2">
              <button className="btn btn-xs btn-outline">Edit</button>
              <button className="btn btn-xs btn-error">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary mt-4">+ Add New Address</button>
    </div>
  );
};
export default AddressBook;