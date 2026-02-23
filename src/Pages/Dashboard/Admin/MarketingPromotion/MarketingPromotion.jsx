const MarketingPromotion = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🎯 Marketing & Promotion</h2>

      {/* Top Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="btn btn-sm btn-primary">Coupon System</button>
        <button className="btn btn-sm btn-secondary">Voucher System</button>
        <button className="btn btn-sm btn-warning">Flash Sale</button>
        <button className="btn btn-sm btn-info">Create Campaign</button>
        <button className="btn btn-sm btn-accent">Referral System</button>
        <button className="btn btn-sm btn-success">Banner Ads</button>
        <button className="btn btn-sm btn-outline">Push Notification</button>
        <button className="btn btn-sm btn-error">Email Marketing</button>
      </div>

      {/* Campaign Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Campaign</th>
              <th>Type</th>
              <th>Discount</th>
              <th>Status</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {[1,2,3].map(c => (
              <tr key={c}>
                <td>New Year Offer</td>
                <td>
                  <span className="badge badge-info">Flash Sale</span>
                </td>
                <td>20%</td>
                <td>
                  <span className="badge badge-success">Active</span>
                </td>
                <td>10 Feb - 20 Feb</td>
                <td className="space-x-1">
                  <button className="btn btn-xs btn-outline">Edit</button>
                  <button className="btn btn-xs btn-warning">Pause</button>
                  <button className="btn btn-xs btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketingPromotion;