const Settings = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">⚙️ Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-3">🌍 General Settings</h3>
          <select className="select select-bordered w-full mb-2">
            <option>Currency (BDT)</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
          <select className="select select-bordered w-full mb-2">
            <option>Language (English)</option>
            <option>Bangla</option>
          </select>
          <input className="input input-bordered w-full mb-2" placeholder="Shipping Charge" />
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-3">📜 Policy Pages</h3>
          <button className="btn btn-outline w-full mb-2">Return Policy</button>
          <button className="btn btn-outline w-full mb-2">Privacy Policy</button>
          <button className="btn btn-outline w-full mb-2">Terms & Conditions</button>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-3">🎨 Appearance</h3>
          <button className="btn btn-sm btn-secondary mr-2">Light</button>
          <button className="btn btn-sm btn-neutral">Dark</button>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-3">🖼 Branding</h3>
          <button className="btn btn-sm btn-primary mr-2">Upload Logo</button>
          <button className="btn btn-sm btn-accent">Upload Favicon</button>
        </div>

      </div>
    </div>
  );
};

export default Settings;