import Logo from "../../../../Utils/Logo/Logo";
import UserMenu from "./UserMenu";
import SellerMenu from "./SellerMenu";
import AdminMenu from "./AdminMenu";
import ModeratorMenu from "./ModeratorMenu";
import MenuItem from "./MenuItem";
import useAuth from "../../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { CgLogOut } from "react-icons/cg";
const Menu = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("logout success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex flex-col bg-lightnav dark:bg-darknav/80 ">
      <div className="flex w-full justify-center py-2 shrink-0">
        <Logo />
      </div>
      <div className="flex-1 overflow-y-auto scroll-smooth no-scrollbar px-4 mt-4">
        <ul className="space-y-3 dark:text-white">
          <AdminMenu />
          <hr />
          <ModeratorMenu />
          <hr />
          <SellerMenu />
          <hr />
          <UserMenu />
          <MenuItem
          label={"Log Out"}
          to={"/login"}
          icon={CgLogOut}
          onClick={handleLogout}
        />
        </ul>
      </div>
    </div>
  );
};

export default Menu;
