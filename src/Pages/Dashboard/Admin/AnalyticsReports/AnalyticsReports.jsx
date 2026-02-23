const AnalyticsReports = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Analytics & Reports</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Daily Sales</p>
          <h3 className="text-xl font-bold">৳ 5,200</h3>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Monthly Sales</p>
          <h3 className="text-xl font-bold">৳ 1,25,000</h3>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Yearly Sales</p>
          <h3 className="text-xl font-bold">৳ 12,00,000</h3>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Profit / Loss</p>
          <h3 className="text-xl font-bold text-green-600">+ ৳ 25,000</h3>
        </div>
      </div>

      {/* Stats Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Metric</th>
              <th>Value</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Top Selling Product</td>
              <td>Wireless Headphone</td>
              <td><span className="badge badge-success">High</span></td>
            </tr>
            <tr>
              <td>Top Seller</td>
              <td>Tech Store</td>
              <td><span className="badge badge-info">Best</span></td>
            </tr>
            <tr>
              <td>Most Active User</td>
              <td>Fuad Rahman</td>
              <td><span className="badge badge-secondary">Active</span></td>
            </tr>
            <tr>
              <td>Refund Rate</td>
              <td>3%</td>
              <td><span className="badge badge-warning">Low</span></td>
            </tr>
            <tr>
              <td>Cancel Rate</td>
              <td>5%</td>
              <td><span className="badge badge-error">Medium</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsReports;