import { NavLink } from "react-router";

const MenuItem = ({ to, label, icon: Icon, onClick }) => {
  return (
    <li>
      <NavLink
        to={to}
        end
        onClick={onClick}
        className={({ isActive }) =>
          `py-2 px-4 flex items-center gap-2 text-sm rounded-md transition-all
           ${
             isActive
               ? "bg-emerald-500/20 text-emerald-500 font-semibold"
               : "hover:bg-emerald-500/10 hover:text-emerald-500"
           }`
        }
      >
        {Icon && <Icon className="text-lg" />} {label}
      </NavLink>
    </li>
  );
};

export default MenuItem;
