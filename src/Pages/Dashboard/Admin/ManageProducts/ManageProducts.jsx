import { FaBox } from "react-icons/fa6";

const ManageProducts = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 dark:text-green-400"><FaBox/>Product Management</h2>

      {/* Top Controls */}
      <div className="flex flex-wrap gap-3 mb-5">
        <button className="btn btn-sm btn-primary">+ Add Product</button>
        <button className="btn btn-sm btn-secondary">Bulk Upload</button>
        <button className="btn btn-sm btn-warning">Manage Categories</button>
        <button className="btn btn-sm btn-info">Manage Brands</button>
        <button className="btn btn-sm btn-accent">Manage Attributes</button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Status</th>
              <th>Visibility</th>
              <th>Flags</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3].map((p) => (
              <tr key={p}>
                <td>
                  <div>
                    <p className="font-semibold">Wireless Headphone</p>
                    <p className="text-sm text-gray-500">SKU: #HP234</p>
                  </div>
                </td>

                <td>Electronics</td>
                <td>Samsung</td>

                <td>
                  <span className="badge badge-warning">Pending</span>
                </td>

                <td>
                  <span className="badge badge-success">Visible</span>
                </td>

                <td>
                  <span className="badge badge-error">Duplicate</span>
                </td>

                <td className="space-x-1">
                  <button className="btn btn-xs btn-success">Approve</button>
                  <button className="btn btn-xs btn-error">Reject</button>
                  <button className="btn btn-xs btn-outline">Edit</button>
                  <button className="btn btn-xs btn-warning">Force Update</button>
                  <button className="btn btn-xs btn-secondary">Hide</button>
                  <button className="btn btn-xs btn-info">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="p-4 bg-base-100 rounded-lg shadow">
          <h3 className="font-semibold mb-2">📂 Category Management</h3>
          <button className="btn btn-xs btn-primary">Add Category</button>
        </div>

        <div className="p-4 bg-base-100 rounded-lg shadow">
          <h3 className="font-semibold mb-2">📁 Subcategory Management</h3>
          <button className="btn btn-xs btn-primary">Add Subcategory</button>
        </div>

        <div className="p-4 bg-base-100 rounded-lg shadow">
          <h3 className="font-semibold mb-2">🏷 Brand Management</h3>
          <button className="btn btn-xs btn-primary">Add Brand</button>
        </div>

        <div className="p-4 bg-base-100 rounded-lg shadow">
          <h3 className="font-semibold mb-2">🎨 Attribute Management</h3>
          <p className="text-sm text-gray-500 mb-2">Size, Color, Material</p>
          <button className="btn btn-xs btn-primary">Add Attribute</button>
        </div>

        <div className="p-4 bg-base-100 rounded-lg shadow">
          <h3 className="font-semibold mb-2">📤 Bulk Product Control</h3>
          <button className="btn btn-xs btn-secondary">Upload CSV</button>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;