import { FaAddressBook, FaBagShopping } from "react-icons/fa6";
import MenuItem from "./MenuItem";

const SellerMenu = ({closedware}) => {
  return (
    <div>
      <ul className="space-y-2 border-b border-gray-200">
          <MenuItem
            labal={"Add Product"}
            to={"/dashboard/add-product"}
            icon={FaAddressBook}
            onClick={closedware}
          />
          <MenuItem
            labal={"My Products"}
            to={"/dashboard/my-products"}
            icon={FaAddressBook}
            onClick={closedware}
          />
          <MenuItem
            labal={"Orders"}
            to={"/dashboard/manage-orders"}
            icon={FaAddressBook}
            onClick={closedware}
          />
          <MenuItem
            labal={"Returns / Refunds"}
            to={"/dashboard/return-refund"}
            icon={FaAddressBook}
            onClick={closedware}
          />
          <MenuItem
            labal={"Messages"}
            to={"/dashboard/messages"}
            icon={FaAddressBook}
            onClick={closedware}
          />
          <MenuItem
            labal={"Finance"}
            to={"/dashboard/finance"}
            icon={FaAddressBook}
            onClick={closedware}
          />
          <MenuItem
            labal={"Analytic"}
            to={"/dashboard/analytics"}
            icon={FaAddressBook}
            onClick={closedware}
          />
          <MenuItem
            labal={"Shop"}
            to={"/dashboard/shop-management"}
            icon={FaAddressBook}
            onClick={closedware}
          />
      </ul>
    </div>
  );
};

export default SellerMenu;
