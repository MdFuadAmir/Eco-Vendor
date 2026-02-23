const ManagePayments = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">💳 Payment & Finance</h2>

      {/* Top Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="btn btn-sm btn-primary">Payment Gateway Setup</button>
        <button className="btn btn-sm btn-warning">Set Commission %</button>
        <button className="btn btn-sm btn-info">Seller Payout</button>
        <button className="btn btn-sm btn-accent">Wallet System</button>
        <button className="btn btn-sm btn-secondary">Tax / VAT Settings</button>
      </div>

      {/* Finance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h3 className="text-xl font-bold">৳ 1,25,000</h3>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500 text-sm">Platform Profit</p>
          <h3 className="text-xl font-bold">৳ 25,000</h3>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500 text-sm">Seller Payout</p>
          <h3 className="text-xl font-bold">৳ 80,000</h3>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500 text-sm">Tax / VAT Collected</p>
          <h3 className="text-xl font-bold">৳ 20,000</h3>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow mb-8">
        <h3 className="font-semibold p-4 border-b">📜 Transaction History</h3>
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Txn ID</th>
              <th>User / Seller</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {[1,2,3].map(txn => (
              <tr key={txn}>
                <td>#TXN-100{txn}</td>
                <td>Tech Store</td>
                <td>
                  <span className="badge badge-info">Payout</span>
                </td>
                <td>৳ 5,000</td>
                <td>
                  <span className="badge badge-success">Completed</span>
                </td>
                <td>20 Feb 2026</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Wallet System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-3">👛 Wallet System</h3>
          <button className="btn btn-sm btn-primary">User Wallet</button>
          <button className="btn btn-sm btn-secondary ml-2">Seller Wallet</button>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-3">📊 Platform Profit Report</h3>
          <p className="text-sm text-gray-500 mb-2">
            Monthly / Yearly Revenue & Profit
          </p>
          <button className="btn btn-sm btn-success">View Report</button>
        </div>
      </div>
    </div>
  );
};

export default ManagePayments;