import { FaFileAlt } from "react-icons/fa";
import { Link, Outlet } from "react-router";

const ContentManagement = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-600 dark:text-white">
        <FaFileAlt /> Content Management
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg: lg:grid-cols-5 gap-4 mb-6">
        <Link to={"/dashboard/homepage-slider"} className="btn btn-primary">
          Homepage Slider
        </Link>
        <Link to={"/dashboard/offer-slider"} className="btn btn-secondary">
          Offer Slider
        </Link>
        <Link to={"/dashboard/seo-manager"} className="btn btn-accent">SEO Meta Tags</Link>
      </div>

      {/* Content Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Content Type</th>
              <th>Title</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i}>
                <td>Banner</td>
                <td>Winter Sale</td>
                <td>
                  <span className="badge badge-success">Published</span>
                </td>
                <td>20 Feb 2026</td>
                <td className="space-x-1">
                  <button className="btn btn-xs btn-outline">Edit</button>
                  <button className="btn btn-xs btn-warning">Hide</button>
                  <button className="btn btn-xs btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  );
};

export default ContentManagement;
