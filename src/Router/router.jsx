import { createBrowserRouter } from "react-router-dom";
import Logo from "../Utils/Logo/Logo";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Logo/>
    }
])
export default router;