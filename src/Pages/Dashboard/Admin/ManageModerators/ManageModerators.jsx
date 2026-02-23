const ManageModerators = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🧑‍⚖️ Moderator Management</h2>

      {/* Create Moderator Button */}
      <div className="flex justify-end mb-4">
        <button className="btn btn-primary btn-sm">+ Add Moderator</button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Moderator</th>
              <th>Email</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Status</th>
              <th>Activity Log</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3].map((mod) => (
              <tr key={mod}>
                <td className="font-semibold">Admin Mod</td>
                <td className="text-sm text-gray-500">mod@gmail.com</td>
                <td>
                  <span className="badge badge-info">Moderator</span>
                </td>
                <td>
                  <button className="btn btn-xs btn-warning">
                    Set Permissions
                  </button>
                </td>
                <td>
                  <span className="badge badge-success">Active</span>
                </td>
                <td>
                  <button className="btn btn-xs">View Logs</button>
                </td>
                <td className="space-x-2">
                  <button className="btn btn-xs btn-outline">Suspend</button>
                  <button className="btn btn-xs btn-error">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageModerators;