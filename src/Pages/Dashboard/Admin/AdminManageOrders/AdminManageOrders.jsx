

const AdminManageOrders = () => {
    return (
         <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📦 Order Management</h2>

      {/* Top Controls */}
      <div className="flex flex-wrap gap-3 mb-5">
        <button className="btn btn-sm btn-primary">All Orders</button>
        <button className="btn btn-sm btn-warning">Fraud Detect</button>
        <button className="btn btn-sm btn-success">Generate Invoice</button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Delivery</th>
              <th>Flags</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3].map((order) => (
              <tr key={order}>
                <td className="font-semibold">#ORD-100{order}</td>

                <td>
                  <div>
                    <p className="font-medium">Mahfuzur Fuad</p>
                    <p className="text-sm text-gray-500">fuad@gmail.com</p>
                  </div>
                </td>

                <td>
                  <span className="badge badge-info">COD</span>
                </td>

                <td>
                  <span className="badge badge-warning">Pending</span>
                </td>

                <td>
                  <span className="badge badge-secondary">Processing</span>
                </td>

                <td>
                  <span className="badge badge-error">Fraud Risk</span>
                </td>

                <td className="space-x-1">
                  <button className="btn btn-xs btn-success">
                    Approve Cancel
                  </button>
                  <button className="btn btn-xs btn-accent">
                    Approve Refund
                  </button>
                  <button className="btn btn-xs btn-warning">
                    Force Status
                  </button>
                  <button className="btn btn-xs btn-secondary">
                    Delivery Override
                  </button>
                  <button className="btn btn-xs btn-info">
                    Verify COD
                  </button>
                  <button className="btn btn-xs">
                    Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default AdminManageOrders;