import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Landing/Home/Home";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import MyWishlist from "../Pages/MyWishlist/MyWishlist";
import Cart from "../Pages/Cart/Cart";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageSellers from "../Pages/Dashboard/Admin/ManageSellers/ManageSellers";
import ManageModerators from "../Pages/Dashboard/Admin/ManageModerators/ManageModerators";
import ManageProducts from "../Pages/Dashboard/Admin/ManageProducts/ManageProducts";
import AdminManageOrders from "../Pages/Dashboard/Admin/AdminManageOrders/AdminManageOrders";
import ManagePayments from "../Pages/Dashboard/Admin/ManagePayments/ManagePayments";
import AnalyticsReports from "../Pages/Dashboard/Admin/AnalyticsReports/AnalyticsReports";
import MarketingPromotion from "../Pages/Dashboard/Admin/MarketingPromotion/MarketingPromotion";
import ContentManagement from "../Pages/Dashboard/Admin/ContentManagement/ContentManagement";
import SecuritySystem from "../Pages/Dashboard/Admin/SecuritySystem/SecuritySystem";
import Settings from "../Pages/Dashboard/Admin/Settings/Settings";
import Finance from "../Pages/Dashboard/Vendor/Finance/Finance";
import Analytics from "../Pages/Dashboard/Vendor/Analytics/Analytics";
import AddProduct from "../Pages/Dashboard/Vendor/AddProduct/AddProduct";
import MyProducts from "../Pages/Dashboard/Vendor/MyProducts/MyProducts";
import SellerOrderManagement from "../Pages/Dashboard/Vendor/SellerOrderManagement/SellerOrderManagement";
import ReturnRefund from "../Pages/Dashboard/Vendor/ReturnRefund/ReturnRefund";
import ShopManagement from "../Pages/Dashboard/Vendor/ShopManagement/ShopManagement";
import SellerMessages from "../Pages/Dashboard/Vendor/SellerMessages/SellerMessages";
import MyOrders from "../Pages/Dashboard/Users/MyOrders/MyOrders";
import AddressBook from "../Pages/Dashboard/Users/AddressBook/AddressBook";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import SocialLogin from "../Authentication/SocialLogin";
import HomepageSlider from "../Pages/Dashboard/Admin/ContentManagement/HomepageSlider";
import OfferSlider from "../Pages/Dashboard/Admin/ContentManagement/OfferSlider";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import SeoMetaManager from "../Pages/Dashboard/Admin/ContentManagement/SeoMetaManager";
import ContentOverview from "../Pages/Dashboard/Admin/ContentManagement/ContentOverview";
import ManageCategories from "../Pages/Dashboard/Admin/ManageCategories/ManageCategories";
import CategoriOverview from "../Pages/Dashboard/Admin/ManageCategories/CategoriOverview";
import Categories from "../Pages/Dashboard/Admin/ManageCategories/Categories";
import Subcategories from "../Pages/Dashboard/Admin/ManageCategories/Subcategories";
import Brands from "../Pages/Dashboard/Admin/ManageCategories/Brands";
import Attributes from "../Pages/Dashboard/Admin/ManageCategories/Attributes";
import SellerRequest from "../Pages/Dashboard/Users/SellerRequest/SellerRequest";
import AdminSellerRequests from "../Pages/Dashboard/Admin/AdminSellerRequests/AdminSellerRequests";
import EditProduct from "../Pages/Dashboard/Vendor/AddProduct/EditProduct";
import TopRatedPage from "../Pages/Products/TopRatedPage";
import ProductDetails from "../Pages/Products/ProductDetails";
import ShopPage from "../Pages/Landing/Shop/ShopPage";
import ManageAds from "../Pages/Dashboard/Vendor/ManageAds/ManageAds";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/wishlist",
        Component: MyWishlist,
      },
      {
        path: "/top-rated",
        Component: TopRatedPage,
      },
      {
        path: "/productDetails/:id",
        Component: ProductDetails,
      },
      {
        path: "/shop/:sellerId",
        element: <ShopPage />,
      },
      {
        path: "/cart",
        Component: Cart,
      },
      {
        path: "/cart",
        Component: Cart,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/social-login",
        Component: SocialLogin,
      },
    ],
  },
  //   dashboard layout
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // admin only
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-sellers",
        element: <ManageSellers />,
      },
      {
        path: "manage-moderators",
        element: <ManageModerators />,
      },
      {
        path: "seller-requests",
        element: <AdminSellerRequests />,
      },
      // admon moderator
      {
        path: "content-management",
        element: <ContentManagement />,
        children: [
          {
            index: true,
            element: <ContentOverview />,
          },
          {
            path: "homepage-slider",
            element: <HomepageSlider />,
          },
          {
            path: "offer-slider",
            element: <OfferSlider />,
          },
          {
            path: "seo-manager",
            element: <SeoMetaManager />,
          },
        ],
      },
      {
        path: "categories-management",
        element: <ManageCategories />,
        children: [
          {
            index: true,
            element: <CategoriOverview />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "subcategories",
            element: <Subcategories />,
          },
          {
            path: "brands",
            element: <Brands />,
          },
          {
            path: "attributes",
            element: <Attributes />,
          },
        ],
      },
      
    
      {
        path: "manage-products",
        element: <ManageProducts />,
      },
      {
        path: "admin-orders-management",
        element: <AdminManageOrders />,
      },
      {
        path: "manage-payments",
        element: <ManagePayments />,
      },
      {
        path: "analytics-reports",
        element: <AnalyticsReports />,
      },
      {
        path: "marketing-promotion",
        element: <MarketingPromotion />,
      },
      {
        path: "security-system",
        element: <SecuritySystem />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "finance",
        element: <Finance />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "my-products",
        element: <MyProducts />,
      },
      {
        path: "/dashboard/edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "manage-shopAds",
        element: <ManageAds />,
      },
      {
        path: "manage-orders",
        element: <SellerOrderManagement />,
      },
      {
        path: "return-refund",
        element: <ReturnRefund />,
      },
      {
        path: "shop-management",
        element: <ShopManagement />,
      },
      {
        path: "messages",
        element: <SellerMessages />,
      },
      {
        path: "My-orders",
        element: <MyOrders />,
      },
      {
        path: "messages",
        element: <SellerMessages />,
      },
      
      {
        path: "messages",
        element: <SellerMessages />,
      },
      
      // user/buyer
      {
        path: "address-book",
        element: <AddressBook />,
      },
      {
        path: "request-for-seller",
        element: <SellerRequest />,
      },
    ],
  },
]);
export default router;
