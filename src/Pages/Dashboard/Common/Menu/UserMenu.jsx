import {
  FaAddressBook,
  FaBagShopping,
  FaCartPlus,
  FaHeart,
} from "react-icons/fa6";
import MenuItem from "./MenuItem";
import { RiUserSettingsFill } from "react-icons/ri";

const UserMenu = ({ closedware }) => {
  return (
    <div>
      <ul className="border-b border-gray-400 space-y-2">
        <MenuItem
          labal={"My Orders"}
          to={"/dashboard/my-orders"}
          icon={FaBagShopping}
          onClick={closedware}
        />
        <MenuItem
          labal={"Cart"}
          to={"/cart"}
          icon={FaCartPlus}
          onClick={closedware}
        />
        <MenuItem
          labal={"Wishlist"}
          to={"/wishlist"}
          icon={FaHeart}
          onClick={closedware}
        />
        <MenuItem
          labal={"Address book"}
          to={"/dashboard/address-book"}
          icon={FaAddressBook}
          onClick={closedware}
        />
        <MenuItem
          labal={"Account Settings"}
          to={"/dashboard/settings"}
          icon={RiUserSettingsFill}
          onClick={closedware}
        />
      </ul>
    </div>
  );
};

export default UserMenu;
