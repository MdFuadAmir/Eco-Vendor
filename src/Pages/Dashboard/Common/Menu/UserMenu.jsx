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
          label={"My Orders"}
          to={"/dashboard/my-orders"}
          icon={FaBagShopping}
          onClick={closedware}
        />
        <MenuItem
          label={"Cart"}
          to={"/cart"}
          icon={FaCartPlus}
          onClick={closedware}
        />
        <MenuItem
          label={"Wishlist"}
          to={"/wishlist"}
          icon={FaHeart}
          onClick={closedware}
        />
        <MenuItem
          label={"Address book"}
          to={"/dashboard/address-book"}
          icon={FaAddressBook}
          onClick={closedware}
        />
        <MenuItem
          label={"Account Settings"}
          to={"/dashboard/settings"}
          icon={RiUserSettingsFill}
          onClick={closedware}
        />
      </ul>
    </div>
  );
};

export default UserMenu;
