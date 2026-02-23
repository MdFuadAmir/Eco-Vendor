const SellerOrderManagement = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📦 Order Management</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Invoice</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {[1,2,3].map(i => (
              <tr key={i}>
                <td>#ORD-{i}</td>
                <td>Customer {i}</td>
                <td><span className="badge badge-warning">Pending</span></td>
                <td>
                  <button className="btn btn-xs">Print</button>
                </td>
                <td className="space-x-1">
                  <button className="btn btn-xs btn-success">Accept</button>
                  <button className="btn btn-xs btn-error">Cancel</button>
                  <button className="btn btn-xs btn-info">Pack</button>
                  <button className="btn btn-xs btn-secondary">Ship</button>
                  <button className="btn btn-xs btn-warning">Update Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrderManagement;