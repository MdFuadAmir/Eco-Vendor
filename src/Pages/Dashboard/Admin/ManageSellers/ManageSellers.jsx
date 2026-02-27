const ManageSellers = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Seller Management</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Seller</th>
              <th>Verification</th>
              <th>Products</th>
              <th>Commission</th>
              <th>Rating</th>
              <th>Payout</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {[1,2,3].map(seller => (
              <tr key={seller}>
                <td>
                  <div>
                    <p className="font-semibold">Tech Store</p>
                    <p className="text-sm text-gray-500">seller@gmail.com</p>
                  </div>
                </td>
                <td>
                  <button className="btn btn-xs btn-info">Verify Docs</button>
                </td>
                <td>
                  <button className="btn btn-xs btn-warning">Set Limit</button>
                </td>
                <td>
                  <button className="btn btn-xs btn-accent">Set %</button>
                </td>
                <td>
                  ⭐ 4.5
                </td>
                <td>
                  <button className="btn btn-xs btn-success">Approve</button>
                </td>
                <td className="space-x-2">
                  <button className="btn btn-xs btn-error">Ban</button>
                  <button className="btn btn-xs btn-outline">Suspend</button>
                  <button className="btn btn-xs btn-secondary">Warn</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSellers;