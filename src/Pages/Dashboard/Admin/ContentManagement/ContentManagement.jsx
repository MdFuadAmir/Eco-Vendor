import { FaFileAlt } from "react-icons/fa";
import { Link, Outlet } from "react-router";
import DTitle from "../../../../Utils/DTitle/DTitle";

const ContentManagement = () => {
  return (
    <div className="p-6">
      <DTitle label={"Content Management"} icon={FaFileAlt} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg: lg:grid-cols-5 gap-4 mb-6">
        <Link to={"/dashboard/content-management"} className="btn btn-info">
          Overview
        </Link>
        <Link
          to={"/dashboard/content-management/homepage-slider"}
          className="btn btn-primary"
        >
          Homepage Slider
        </Link>
        <Link
          to={"/dashboard/content-management/offer-slider"}
          className="btn btn-secondary"
        >
          Offer Slider
        </Link>
        <Link
          to={"/dashboard/content-management/seo-manager"}
          className="btn btn-accent"
        >
          SEO Meta Tags
        </Link>
      </div>
      {/* Content  */}
      <Outlet />
    </div>
  );
};

export default ContentManagement;
