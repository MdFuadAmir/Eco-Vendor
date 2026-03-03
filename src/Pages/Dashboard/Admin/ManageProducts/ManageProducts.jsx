import { FaBox } from "react-icons/fa6";
import DTitle from "../../../../Utils/DTitle/DTitle";

const ManageProducts = () => {
  return (
    <div className="p-6">
      <DTitle label={"Product Management"} icon={FaBox} />
      {/* Product Table */}
      <div className="overflow-x-auto mx-auto dark:text-gray-100 bg-white dark:bg-darkfooter/90 rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-darknav dark:text-white">
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Status</th>
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

                <td className="space-x-1">
                  <button className="btn btn-xs btn-accent">View</button>
                  <button className="btn btn-xs btn-success">Approve</button>
                  <button className="btn btn-xs btn-error">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
