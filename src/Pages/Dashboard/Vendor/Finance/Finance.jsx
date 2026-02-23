const Finance = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">💰 Finance</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Sales Report</p>
          <h3 className="text-xl font-bold">৳ 1,20,000</h3>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Earnings</p>
          <h3 className="text-xl font-bold">৳ 35,000</h3>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Commission</p>
          <h3 className="text-xl font-bold">৳ 15,000</h3>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Withdraw Request</p>
          <h3 className="text-xl font-bold">৳ 10,000</h3>
        </div>
      </div>

      {/* Transaction History */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <h3 className="font-semibold p-4 border-b">📜 Transaction History</h3>
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Txn ID</th>
              <th>User</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i}>
                <td>#TXN-10{i}</td>
                <td>Tech Store</td>
                <td>
                  <span className="badge badge-info">Withdraw</span>
                </td>
                <td>৳ 5,000</td>
                <td>
                  <span className="badge badge-success">Completed</span>
                </td>
                <td>22 Feb 2026</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Finance;