import {
  FaUsersCog,
  FaUserTie,
  FaUserShield,
  FaBoxOpen,
  FaTags,
  FaShoppingCart,
  FaMoneyBillWave,
  FaChartBar,
  FaBullhorn,
  FaStar,
  FaFileAlt,
  FaCogs,
} from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = ({ closedware }) => {
  return (
    <div>
      <ul className="space-y-1">

        {/* USERS */}
        <MenuItem
          label="Manage Users"
          to="/dashboard/manage-users"
          icon={FaUsersCog}
          onClick={closedware}
        />

        <MenuItem
          label="Manage Sellers"
          to="/dashboard/manage-sellers"
          icon={FaUserTie}
          onClick={closedware}
        />

        <MenuItem
          label="Manage Moderators"
          to="/dashboard/manage-moderators"
          icon={FaUserShield}
          onClick={closedware}
        />

        {/* PRODUCTS */}
        <MenuItem
          label="Manage Products"
          to="/dashboard/manage-products"
          icon={FaBoxOpen}
          onClick={closedware}
        />

        <MenuItem
          label="Categories & Brands"
          to="/dashboard/manage-categories"
          icon={FaTags}
          onClick={closedware}
        />

        {/* ORDERS */}
        <MenuItem
          label="Orders Management"
          to="/dashboard/admin-orders-management"
          icon={FaShoppingCart}
          onClick={closedware}
        />

        <MenuItem
          label="Payments & Refunds"
          to="/dashboard/manage-payments"
          icon={FaMoneyBillWave}
          onClick={closedware}
        />

        {/* REVIEWS */}
        <MenuItem
          label="Reviews & Reports"
          to="/dashboard/reviews-reports"
          icon={FaStar}
          onClick={closedware}
        />

        {/* MARKETING */}
        <MenuItem
          label="Marketing & Promotions"
          to="/dashboard/marketing-promotion"
          icon={FaBullhorn}
          onClick={closedware}
        />

        {/* ANALYTICS */}
        <MenuItem
          label="Analytics & Reports"
          to="/dashboard/analytics-reports"
          icon={FaChartBar}
          onClick={closedware}
        />

        {/* CONTENT */}
        <MenuItem
          label="Content Management"
          to="/dashboard/content-management"
          icon={FaFileAlt}
          onClick={closedware}
        />

        {/* SETTINGS */}
        <MenuItem
          label="System Settings"
          to="/dashboard/settings"
          icon={FaCogs}
          onClick={closedware}
        />

      </ul>
    </div>
  );
};

export default AdminMenu;