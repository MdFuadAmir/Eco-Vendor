import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import ThemeToggle from "../../Components/ThemeToggle/ThemeToggle";
import Header from "../../Components/Header/Header";


const RootLayout = () => {
  return (
    <div className="relative min-h-screen bg-slate-100 dark:bg-slate-900">
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


