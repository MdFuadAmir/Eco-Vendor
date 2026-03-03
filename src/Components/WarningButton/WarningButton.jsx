import { useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";

const WarningButton = ({ user }) => {
  const axiosPublic = useAxios();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const sendWarning = async () => {
    try {
      const res = await axiosPublic.post("/warnings", {
        userId: user._id,
        name:user?.name,
        email:user?.email,
        message: message,  
      });

      if (res.data.success) {
        toast.success("Warning sent successfully!");
        setShowModal(false);
        setMessage("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send warning");
    }
  };

  return (
    <>
      <button
        className="btn btn-xs btn-error"
        onClick={() => setShowModal(true)}
      >
        Warn
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-darknav p-6 rounded-xl w-96">
            <h3 className="font-bold mb-2 dark:text-white">
              Send Warning to {user.name}
            </h3>

            <textarea
              className="textarea textarea-bordered w-full dark:bg-darkbody dark:text-white"
              placeholder="Write warning message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn btn-sm"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-sm btn-error" onClick={sendWarning}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WarningButton;