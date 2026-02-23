
import { FaAddressBook, FaUsersGear, FaUserShield, FaUserTie } from "react-icons/fa6";
import MenuItem from "./MenuItem";

const AdminMenu = ({closedware}) => {
  return (
    <div>
      <ul className="space-y-2">
        <MenuItem
          labal={"Manage Users"}
          to={"/dashboard/manage-users"}
          icon={FaUsersGear}
          onClick={closedware}
        />
        <MenuItem
          labal={"Manage Seller"}
          to={"/dashboard/manage-sellers"}
          icon={FaUserTie}
          onClick={closedware}
        />
        <MenuItem
          labal={"Manage Moderator"}
          to={"/dashboard/manage-moderators"}
          icon={FaUserShield}
          onClick={closedware}
        />
        <MenuItem
          labal={"Manage Products"}
          to={"/dashboard/manage-products"}
          icon={FaAddressBook}
          onClick={closedware}
        />
        <MenuItem
          labal={"Manage Orders"}
          to={"/dashboard/admin-orders-management"}
          icon={FaAddressBook}
          onClick={closedware}
        />
        <MenuItem
          labal={"Manage Payments"}
          to={"/dashboard/manage-payments"}
          icon={FaAddressBook}
          onClick={closedware}
        />
        <MenuItem
          labal={"Analytics Reports"}
          to={"/dashboard/analytics-reports"}
          icon={FaAddressBook}
          onClick={closedware}
        />
        <MenuItem
          labal={"Marketing Promotion"}
          to={"/dashboard/marketing-promotion"}
          icon={FaAddressBook}
          onClick={closedware}
        />
        <MenuItem
          labal={"Content-Managemet"}
          to={"/dashboard/content-management"}
          icon={FaAddressBook}
          onClick={closedware}
        />
        <MenuItem
          labal={"Settings"}
          to={"/dashboard/settings"}
          icon={FaAddressBook}
          onClick={closedware}
        />
        
      </ul>
    </div>
  );
};

export default AdminMenu;
