const ShortText = ({ text }) => {
  return (
    <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
      {text}
      <span className="text-blue-600 cursor-pointer ml-1">... Show more</span>
    </p>
  );
};

export default ShortText;