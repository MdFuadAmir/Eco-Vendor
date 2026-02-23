const AccountSettings = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">⚙️ Account Settings</h2>

      <div className="space-y-4">
        <input className="input input-bordered w-full" placeholder="Full Name" />
        <input className="input input-bordered w-full" placeholder="Email" />
        <input className="input input-bordered w-full" placeholder="Phone Number" />

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Change Password</h3>
          <input type="password" className="input input-bordered w-full mb-2" placeholder="Old Password" />
          <input type="password" className="input input-bordered w-full" placeholder="New Password" />
        </div>

        <button className="btn btn-primary w-full">Save Changes</button>
      </div>
    </div>
  );
};
export default AccountSettings;