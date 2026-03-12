import {
  FaBoxOpen,
  FaFlag,
  FaStarHalfAlt,
  FaUsers,
  FaShoppingCart,
  FaHeadset,
  FaFileAlt,
  FaChartLine,
} from "react-icons/fa";
import MenuItem from "./MenuItem";

const ModeratorMenu = ({ closedware }) => {
  return (
    <div>
      <ul className="space-y-1">

        {/* PRODUCTS */}
        <MenuItem
          label="Manage Products"
          to="/dashboard/manage-products"
          icon={FaBoxOpen}
          onClick={closedware}
        />

        <MenuItem
          label="Reported Products"
          to="/dashboard/reported-products"
          icon={FaFlag}
          onClick={closedware}
        />

        {/* REVIEWS */}
        <MenuItem
          label="Reported Reviews"
          to="/dashboard/reported-reviews"
          icon={FaStarHalfAlt}
          onClick={closedware}
        />

        {/* USERS */}
        <MenuItem
          label="User Complaints"
          to="/dashboard/user-complaints"
          icon={FaUsers}
          onClick={closedware}
        />

        <MenuItem
          label="Seller Monitoring"
          to="/dashboard/seller-monitoring"
          icon={FaUsers}
          onClick={closedware}
        />

        {/* ORDERS */}
        <MenuItem
          label="Order Monitoring"
          to="/dashboard/order-monitoring"
          icon={FaShoppingCart}
          onClick={closedware}
        />

        {/* SUPPORT */}
        <MenuItem
          label="Support Tickets"
          to="/dashboard/support-tickets"
          icon={FaHeadset}
          onClick={closedware}
        />

        {/* CONTENT */}
        <MenuItem
          label="Content Moderation"
          to="/dashboard/content-moderation"
          icon={FaFileAlt}
          onClick={closedware}
        />

        {/* REPORTS */}
        <MenuItem
          label="Activity Reports"
          to="/dashboard/moderator-reports"
          icon={FaChartLine}
          onClick={closedware}
        />
      

      </ul>
    </div>
  );
};

export default ModeratorMenu;