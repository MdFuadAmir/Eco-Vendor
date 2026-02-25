import { IoSearch } from "react-icons/io5";
import Button from "@mui/material/Button";
const Search = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg  relative">
      <input
        type="text"
        placeholder={placeholder}
        className=" placeholder:text-gray-500 text-black dark:text-white w-full h-full px-4 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button className="absolute! right-1 h-8 rounded-lg top-1.5">
        <IoSearch className="text-xl text-emerald-400 z-50" />
      </Button>
    </div>
  );
};

export default Search;
