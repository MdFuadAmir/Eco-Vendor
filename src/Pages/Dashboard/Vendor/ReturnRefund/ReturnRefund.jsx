const ReturnRefund = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🔁 Return & Refund</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Order ID</th>
              <th>Issue</th>
              <th>Request Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {[1,2,3].map(i => (
              <tr key={i}>
                <td>#ORD-{i}</td>
                <td>Damaged Item</td>
                <td>
                  <span className="badge badge-info">Refund</span>
                </td>
                <td>
                  <span className="badge badge-warning">Pending</span>
                </td>
                <td className="space-x-1">
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

export default ReturnRefund;