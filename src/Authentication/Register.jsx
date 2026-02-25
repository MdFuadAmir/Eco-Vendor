import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import toast from "react-hot-toast";

const Register = () => {
  const { signup, updateUserProfile} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const axiosPublic = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signup(data?.email, data?.password)
      .then(async (result) => {
        const user = result.user;
        const userInfo = {
          email: user?.email,
          name: data?.fullName,
          role: "user",
          status: "Active",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        const userRes = await axiosPublic.post("/users", userInfo);
        if (userRes.data.success && userRes.data.insertedId) {
          toast.success("Your Account has been created");
        } else {
          toast.success("User already exists");
        }
        const updateProfile = {
          displayName: data?.fullName,
        };
        updateUserProfile(updateProfile)
          .then(() => {
            toast.success("update user info");
            navigate(from, { replace: true });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#104f55]/10 dark:bg-[#16404D]">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center dark:text-gray-200">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 outline-none w-full dark:text-gray-200"
              placeholder="Enter full name"
            />
            {errors.fullName && (
              <p className="text-red-400 mt-1">{errors.fullName.message}</p>
            )}
          </div>

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
            className="px-4 py-2 rounded-lg text-white bg-emerald-500 hover:bg-emerald-600 w-full mt-2"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-400 cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
