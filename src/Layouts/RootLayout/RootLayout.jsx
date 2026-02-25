import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import ThemeToggle from "../../Components/ThemeToggle/ThemeToggle";
import Header from "../../Components/Header/Header";

const RootLayout = () => {
  return (
    // dark:bg-[#001524]
    <div className="relative min-h-screen bg-[#104f55]/10 dark:bg-[#16404D]">
      <div className="relative z-10">
        <Header />
        <div className="max-w-650 mx-auto min-h-screen">
          <Outlet />
          <div className="fixed bottom-32 right-0 z-50">
            <ThemeToggle />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default RootLayout;
