import { NavLink, Outlet } from "react-router";
import DTitle from "../../../../Utils/DTitle/DTitle";
import { FaList } from "react-icons/fa";

const ManageCategories = () => {
  return (
    <div className="p-6">
      <DTitle label={"Category Management"} icon={FaList} />
      {/* Top Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg: lg:grid-cols-5 gap-4 my-6">
        <NavLink to="/dashboard/categories-management" className="btn btn-info">
          Overview
        </NavLink>
        <NavLink to="categories" className="btn btn-accent">
          Categories
        </NavLink>
        <NavLink to="subcategories" className="btn btn-primary">
          Subcategories
        </NavLink>
        <NavLink to="brands" className="btn btn-info">
          Brands
        </NavLink>
        <NavLink to="attributes" className="btn btn-active">
          Attributes
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default ManageCategories;
