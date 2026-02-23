const MyOrders = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 My Orders</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3].map(i => (
              <tr key={i}>
                <td>#ORD-{i}</td>
                <td>22 Feb 2026</td>
                <td><span className="badge badge-success">Delivered</span></td>
                <td>৳ 1200</td>
                <td><button className="btn btn-xs">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MyOrders;