import image from "../../assets/Logo/leaf.png";
import { Link } from "react-router";

const Logo = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link
      to="/"
      onClick={handleScrollTop}
      className="flex items-center gap-1 text-green-500 hover:opacity-90 transition"
    >
      {/* Logo Image */}
      <img
        src={image}
        alt="Eco Vendex Logo"
        className="w-9 h-9 object-cover"
      />

      {/* Text Logo */}
      <div className="leading-none">
        <h1 className="text-lg font-extrabold tracking-wide">
          ECO<span className="text-gray-500 dark:text-white">-</span>
        </h1>
        <p className="text-xs font-semibold tracking-widest text-gray-700 dark:text-gray-300">
          VENDEX
        </p>
      </div>
    </Link>
  );
};

export default Logo;