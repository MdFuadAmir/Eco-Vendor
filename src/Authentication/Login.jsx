import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAxios from "../Hooks/useAxios";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Login Successfully");
      console.log("current user",data);
      navigate(from, { replace: true });
      axiosPublic
        .patch("/users/last-login", {
          email: data.email,
          lastLogin: new Date().toISOString(),
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#104f55]/10 dark:bg-[#16404D]">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center dark:text-gray-300">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 dark:text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 outline-none w-full dark:text-gray-200"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 dark:text-gray-300">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 outline-none w-full dark:text-gray-200"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white mt-2"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-400 cursor-pointer">
            Register
          </Link>
        </p>
        <hr className="my-4 text-gray-500" />
      </div>
    </div>
  );
};

export default Login;
