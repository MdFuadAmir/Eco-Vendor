import { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-2xl px-3 py-2 bg-white dark:bg-slate-800 dark:text-white rounded-l-full"
    >
      {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
};

export default ThemeToggle;
