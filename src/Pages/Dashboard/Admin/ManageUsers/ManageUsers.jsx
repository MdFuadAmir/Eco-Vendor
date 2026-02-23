import { FaUsers } from "react-icons/fa6";

const ManageUsers = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex gap-2 items-center dark:text-green-400"><FaUsers/> User Management</h2>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Orders</th>
              <th>Wallet</th>
              <th>Complaints</th>
              <th>Activity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3].map((user) => (
              <tr key={user}>
                <td>
                  <div>
                    <p className="font-semibold">Mahfuzur Fuad</p>
                    <p className="text-sm text-gray-500">fuad@gmail.com</p>
                  </div>
                </td>

                <td>
                  <span className="badge badge-success">Active</span>
                </td>

                <td>
                  <button className="btn btn-xs btn-info">View Orders</button>
                </td>

                <td>
                  <button className="btn btn-xs btn-warning">Wallet</button>
                </td>

                <td>
                  <button className="btn btn-xs btn-secondary">
                    Complaints
                  </button>
                </td>

                <td>
                  <button className="btn btn-xs">Logs</button>
                </td>

                <td className="space-x-2">
                  <button className="btn btn-xs btn-error">Delete</button>
                  <button className="btn btn-xs btn-outline">Suspend</button>
                  <button className="btn btn-xs btn-accent">Block</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
