const Analytics = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Analytics</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Product Views</p>
          <h3 className="text-xl font-bold">12,500</h3>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Conversion Rate</p>
          <h3 className="text-xl font-bold">3.2%</h3>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Best Selling Product</p>
          <h3 className="text-lg font-semibold">Wireless Headphone</h3>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Monthly Revenue</p>
          <h3 className="text-xl font-bold">৳ 95,000</h3>
        </div>
      </div>

      {/* Analytics Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <h3 className="font-semibold p-4 border-b">📈 Product Performance</h3>
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Product</th>
              <th>Views</th>
              <th>Orders</th>
              <th>Conversion</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {[1,2,3].map((i) => (
              <tr key={i}>
                <td>Product {i}</td>
                <td>3,200</td>
                <td>120</td>
                <td>3.7%</td>
                <td>
                  <span className="badge badge-success">Good</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
