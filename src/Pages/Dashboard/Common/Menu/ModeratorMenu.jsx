import { FaAddressBook } from "react-icons/fa6";
import MenuItem from "./MenuItem";

const ModeratorMenu = ({closedware}) => {
  return (
    <div>
      <ul className="space-y-2 border-b border-gray-300">
        <MenuItem
          labal={"Support"}
          to={"/dashboard"}
          icon={FaAddressBook}
          onClick={closedware}
        />
      </ul>
    </div>
  );
};

export default ModeratorMenu;
