import Logo from "../../../../Utils/Logo/Logo";
import UserMenu from "./UserMenu";
import SellerMenu from "./SellerMenu";
import AdminMenu from "./AdminMenu";
import ModeratorMenu from "./ModeratorMenu";
const Menu = () => {
  return (
    <div className="">
      <div className="flex w-full justify-center py-2 border-b border-emerald-400 mb-2">
        <Logo />
      </div>
      <div className="px-4">
        <ul className="space-y-3 text-gray-800 dark:text-white">
          <AdminMenu />
          <ModeratorMenu />
          <SellerMenu />
          <UserMenu />
        </ul>
      </div>
    </div>
  );
};

export default Menu;
