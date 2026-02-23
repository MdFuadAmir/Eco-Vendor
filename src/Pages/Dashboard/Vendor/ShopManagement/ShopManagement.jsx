const ShopManagement = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🏪 Shop Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-3">Shop Profile</h3>
          <input className="input input-bordered w-full mb-2" placeholder="Shop Name" />
          <textarea className="textarea textarea-bordered w-full mb-2" placeholder="Shop Description"></textarea>
          <textarea className="textarea textarea-bordered w-full" placeholder="Shop Policy"></textarea>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-3">Branding</h3>
          <button className="btn btn-sm btn-primary mr-2">Upload Logo</button>
          <button className="btn btn-sm btn-secondary">Upload Banner</button>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-3">Vacation Mode</h3>
          <button className="btn btn-warning">Enable Vacation Mode</button>
        </div>

      </div>
    </div>
  );
};

export default ShopManagement;