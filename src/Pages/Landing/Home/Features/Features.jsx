import {
  FaShippingFast,
  FaUndoAlt,
  FaLock,
  FaGift,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaShippingFast size={28} />,
    title: "Free Shipping",
    desc: "On all orders over $50",
  },
  {
    id: 2,
    icon: <FaUndoAlt size={28} />,
    title: "30 Days Return",
    desc: "Easy return policy",
  },
  {
    id: 3,
    icon: <FaLock size={28} />,
    title: "Secure Payment",
    desc: "100% protected payment",
  },
  {
    id: 4,
    icon: <FaGift size={28} />,
    title: "Special Gift",
    desc: "Gift for special customers",
  },
  {
    id: 5,
    icon: <FaHeadset size={28} />,
    title: "Support 24/7",
    desc: "Dedicated support team",
  },
];

const Features = () => {
  return (
    <div className="bg-[#001524]/10 dark:bg-[#104f55]/50 py-10 my-12">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {features.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center p-4 rounded-lg shadow-sm hover:shadow-md transition bg-gray-50 dark:bg-gray-900"
          >
            <div className="text-emerald-500 mb-3">{item.icon}</div>
            <h3 className="font-semibold text-gray-800 dark:text-white">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
