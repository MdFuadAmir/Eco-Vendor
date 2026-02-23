const SecuritySystem = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🛡️ Security & System</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button className="btn btn-error">IP Ban</button>
        <button className="btn btn-secondary">Login History</button>
        <button className="btn btn-info">Activity Logs</button>
        <button className="btn btn-warning">Brute Force Protection</button>
        <button className="btn btn-accent">Maintenance Mode</button>
        <button className="btn btn-success">Backup System</button>
        <button className="btn btn-outline">Restore System</button>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Type</th>
              <th>User/IP</th>
              <th>Action</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {[1,2,3].map(i => (
              <tr key={i}>
                <td>Login</td>
                <td>192.168.0.{i}</td>
                <td>Failed Attempt</td>
                <td>20 Feb 2026</td>
                <td><span className="badge badge-error">Blocked</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SecuritySystem;