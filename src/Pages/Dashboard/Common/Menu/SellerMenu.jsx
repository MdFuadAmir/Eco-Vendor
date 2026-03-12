import {
  FaPlusCircle,
  FaBoxOpen,
  FaShoppingCart,
  FaUndoAlt,
  FaComments,
  FaWallet,
  FaChartLine,
  FaStore,
  FaBullhorn,
  FaStar,
} from "react-icons/fa";

import MenuItem from "./MenuItem";

const SellerMenu = ({ closedware }) => {
  return (
    <div>
      <ul className="space-y-1">
        {/* PRODUCTS */}
        <MenuItem
          label="Add Product"
          to="/dashboard/add-product"
          icon={FaPlusCircle}
          onClick={closedware}
        />
        {/* my products */}
        <MenuItem
          label="My Products"
          to="/dashboard/my-products"
          icon={FaBoxOpen}
          onClick={closedware}
        />
        {/* MARKETING */}
        <MenuItem
          label="Shop Ads"
          to="/dashboard/manage-shopAds"
          icon={FaBullhorn}
          onClick={closedware}
        />
        {/* SHOP */}
        <MenuItem
          label="Shop Management"
          to="/dashboard/shop-management"
          icon={FaStore}
          onClick={closedware}
        />
        {/* ORDERS */}
        <MenuItem
          label="Orders"
          to="/dashboard/manage-orders"
          icon={FaShoppingCart}
          onClick={closedware}
        />

        <MenuItem
          label="Returns / Refunds"
          to="/dashboard/return-refund"
          icon={FaUndoAlt}
          onClick={closedware}
        />

        {/* COMMUNICATION */}
        <MenuItem
          label="Messages"
          to="/dashboard/messages"
          icon={FaComments}
          onClick={closedware}
        />

        {/* FINANCE */}
        <MenuItem
          label="Finance"
          to="/dashboard/finance"
          icon={FaWallet}
          onClick={closedware}
        />

        {/* ANALYTICS */}
        <MenuItem
          label="Analytics"
          to="/dashboard/analytics"
          icon={FaChartLine}
          onClick={closedware}
        />

        <MenuItem
          label="Reviews & Ratings"
          to="/dashboard/reviews"
          icon={FaStar}
          onClick={closedware}
        />
      
      </ul>
    </div>
  );
};

export default SellerMenu;
