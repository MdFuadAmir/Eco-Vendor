import { NavLink } from "react-router";

const MenuItem = ({ to, labal, icon: Icon, onClick }) => {
  return (
    <li>
      <NavLink
        to={to}
        end
        onClick={onClick}
        className={({ isActive }) =>
          `py-2 px-4 flex items-center gap-2 text-sm  rounded-md  ${isActive ? "bg-emerald-500/20 text-emerald-500" : "hover:text-emerald-500 hover:underline"}`
        }
      >
        {Icon && <Icon className="text-lg" />} {labal}
      </NavLink>
    </li>
  );
};

export default MenuItem;
