const ShortText = ({ text }) => {
  return (
    <h1 className="text-md font-medium dark:text-white leading-relaxed line-clamp-2">
      {text}
      <span className="text-blue-600 text-xs cursor-pointer ml-1">... Show more</span>
    </h1>
  );
};

export default ShortText;