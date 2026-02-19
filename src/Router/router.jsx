import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Landing/Home/Home";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  },
  //   auth layout
  {
    path: "/",
    element: <AuthLayout />,
  },
  //   dashboard layout
  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },
]);
export default router;
