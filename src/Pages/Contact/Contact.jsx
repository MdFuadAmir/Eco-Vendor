
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";

const Contact = () => {
  const axiosPublic = useAxios();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axiosPublic.post("/contact", data);
      toast.success("Message sent successfully!");
      reset();
    } catch{
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Contact Us
      </h1>

      <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
        Have questions or feedback? We'd love to hear from you! Fill out the form below.
      </p>

      <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-darkfooter p-8 rounded-xl shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-darkbody dark:text-white"
          />
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-darkbody dark:text-white"
          />
          <input
            {...register("subject")}
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-darkbody dark:text-white"
          />
          <textarea
            {...register("message", { required: true })}
            rows={5}
            placeholder="Your Message"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-darkbody dark:text-white"
          ></textarea>
          <button type="submit" className="btn btn-primary w-full py-2">
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-4 bg-gray-200 dark:bg-darknav rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Address</h3>
          <p className="text-gray-700 dark:text-gray-300">Kushtia, Bangladesh</p>
        </div>
        <div className="p-4 bg-gray-200 dark:bg-darknav rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Phone</h3>
          <p className="text-gray-700 dark:text-gray-300">+880 1705470131</p>
        </div>
        <div className="p-4 bg-gray-200 dark:bg-darknav rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Email</h3>
          <p className="text-gray-700 dark:text-gray-300">mdfuadamir@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;