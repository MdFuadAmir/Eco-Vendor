import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const axiosPublic = useAxios();

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        role: "user",
        status: "Active",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      try {
        await axiosPublic.post("/users", userInfo);
      } catch {
        toast.error("login failed");
      }
      toast.success("Login Success !!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#104f55]/10 dark:bg-[#16404D]">
      <div className="bg-white dark:bg-gray-900  p-10 rounded-xl shadow-lg w-full text-center max-w-md dark:text-white">
        <h2 className="text-3xl font-bold mb-6">Login with</h2>

        <div className="space-y-4">
          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full p-3 border border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <FcGoogle className="mr-3 text-2xl" />
            Continue with Google
          </button>

          {/* Facebook Login */}
          <button
            // onClick={() => handleSocialLogin("Facebook")}
            className="flex items-center justify-center w-full p-3 border border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-blue-400"
          >
            <FaFacebookF className="mr-3 text-2xl" />
            Continue with Facebook
          </button>
        </div>
        <p className="mt-6 text-gray-400">
          Or login with{" "}
          <Link to={"/login"} className="text-blue-400 cursor-pointer">
            Email
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;
