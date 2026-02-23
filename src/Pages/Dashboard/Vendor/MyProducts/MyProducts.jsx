const MyProducts = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🛒 My Products</h2>

      {/* Top Actions */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search product..."
          className="input input-bordered w-1/3"
        />
        <button className="btn btn-primary btn-sm">+ Add New Product</button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Discount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3].map((item) => (
              <tr key={item}>
                <td>
                  <img
                    src="https://via.placeholder.com/50"
                    alt="product"
                    className="w-12 h-12 rounded"
                  />
                </td>

                <td>
                  <div>
                    <p className="font-semibold">Product {item}</p>
                    <p className="text-sm text-gray-500">Category: Electronics</p>
                  </div>
                </td>

                <td>৳ 500</td>
                <td>20</td>
                <td>10%</td>

                <td>
                  <span className="badge badge-success">Active</span>
                </td>

                <td className="space-x-1">
                  <button className="btn btn-xs btn-outline">Edit</button>
                  <button className="btn btn-xs btn-warning">Update Stock</button>
                  <button className="btn btn-xs btn-info">Update Price</button>
                  <button className="btn btn-xs btn-accent">Set Discount</button>
                  <button className="btn btn-xs btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;